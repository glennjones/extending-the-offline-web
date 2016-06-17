
var asyncjsIndex;
var placesIndex;
var asyncjsBuildEvent = new Event('asyncjs-built');
var placesBuildEvent = new Event('places-built');


document.addEventListener("DOMContentLoaded", function (event) {

    // create asyncjs index
    var options = {
        'text': [
            { 'path': 'title', 'boost': 20 },
            { 'path': 'tags' },
            { 'path': 'text' },
        ]
    }
    asyncjsIndex = new Mani(options);


    // create places index
    var placesOptions = {
        'text': [
            { 'path': 'tags' }
        ],
        'geo': {
            'point': {
                'latitudePath': 'latitude',
                'longitudePath': 'longitude',
            }
        }
    }
    placesIndex = new Mani(placesOptions);


    // fetch and load data for asyncjs index
    fetch('/data/asyncjs-events.json')
        .then(function (response) {
            return response.json()
        }).then(function (json) {
            json = json.filter(function (item) {
                return (item.title !== null && item.category === "event")
            });
            asyncjsIndex.add(json);
            document.dispatchEvent(asyncjsBuildEvent);
        }).catch(function (err) {
            console.log('parsing failed', err)
        })


    // fetch and load data for places index
    fetch('/data/places.json')
        .then(function (response) {
            return response.json()
        }).then(function (json) {
            placesIndex.add(json);
            document.dispatchEvent(placesBuildEvent);
        }).catch(function (err) {
            console.log('parsing failed', err)
        })


    // get JSON from a given textarea
    function parseJsonFromElt(elt, callback) {
        var str = elt.value;
        try {
            var json = JSON.parse(str);
            callback(null, json);
        } catch (err) {
            callback(err, null);
        }
    }


    // builds html string for test search results
    function displayText(results, outputElement) {
        var titles = results.items.map(function (entry) {
            return '<li>' + entry.title + '</li>'
        })
        outputElement.innerHTML = '<p>Found: ' + results.items.length + '</p><ul>' + titles.join('') + '</ul>';
    }


    // builds html string for facets results
    function displayFacets(results, outputElement) {
        var facets = results.facets.map(function (facet) {
            return '<li>' + facet[0] + ' (' + facet[1] + ')</li>'
        })
        outputElement.innerHTML = '<ul>' + facets.join('') + '</ul>';
    }


    // builds html string for places search results
    function displayPlaces(results, outputElement) {
        var places = results.items.map(function (place) {
            return '<li>' + place.name + ' (' + getDistance(place) + ')</li>'
        })
        outputElement.innerHTML = '<ul>' + places.join('') + '</ul>';
    }


    // updates the DOM with query results
    function update(input, index, output, updateType) {
        parseJsonFromElt(input, function (err, json) {
            if (json) {
                var results = index.search(json);
                switch (updateType) {
                    case 'text':
                        displayText(results, output)
                        break;
                    case 'facets':
                        displayFacets(results, output)
                        break;
                    case 'places':
                        displayPlaces(results, output)
                        break;
                }
            } else {
                console.log(err);
            }
        });
    }



    // returns distance as a string in miles, meters and mins walk
    function getDistance(item) {
        if (item.distance) {
            // converts meters into miles, round to 1
            var meters = Mani.geo.convertUnit('m', item.distance, 0);
            var miles = Mani.geo.convertUnit('mi', item.distance, 1);
            if (meters < 100) {
                return meters + 'm';
            } else if (miles < 1) {
                return parseInt(miles * 22) + 'mins walk';
            } else {
                return miles + 'miles';
            }
        }
        return '';
    }


    // --------------------------

    var input01 = document.getElementById('input01');
    var output01 = document.getElementById('output01');
    var textSimpleBtn = document.getElementById('text-simple');
    var textPagingBtn = document.getElementById('text-paging');
    var textSortBtn = document.getElementById('text-sort');

    document.addEventListener('asyncjs-built', function (evt) {
        update(input01, asyncjsIndex, output01,'text');
    }, false);

    input01.addEventListener('input', function (evt) {
        update(input01, asyncjsIndex, output01,'text');
    }, false);


    textSimpleBtn.addEventListener('click', function (evt) {
        parseJsonFromElt(input01, function (err, json) {
            if (json) {
                delete json.startAt;
                delete json.limit;
                delete json.sort;
                input01.value = js_beautify(JSON.stringify(json));
            } else {
                input01.value = js_beautify(JSON.stringify({ "text": "promises", }));
            }
            update(input01, asyncjsIndex, output01,'text');
        });
    }, false);


    textPagingBtn.addEventListener('click', function (evt) {
        parseJsonFromElt(input01, function (err, json) {
            if (json) {
                json.startAt = 0;
                json.limit = 200;
                delete json.sort;
                input01.value = js_beautify(JSON.stringify(json));
            } else {
                input01.value = js_beautify(JSON.stringify({ "text": "promises", "startAt": 0, "limit": 200 }));
            }
            update(input01, asyncjsIndex, output01, 'text');
        });
    }, false);


    textSortBtn.addEventListener('click', function (evt) {
        parseJsonFromElt(input01, function (err, json) {
            if (json) {
                json.startAt = 0;
                json.limit = 200;
                json.sort = {
                    'path': 'score',
                    'reverse': true
                }
                input01.value = js_beautify(JSON.stringify(json));
            } else {
                input01.value = js_beautify(JSON.stringify({
                    'text': 'promises',
                    'startAt': 0,
                    'limit': 200,
                    'sort': {
                        'path': 'score',
                        'reverse': true
                    }
                }));
            }
            update(input01, asyncjsIndex, output01, 'text');
        });
    }, false);



    // --------------------------




    var input02 = document.getElementById('input02');
    var output02 = document.getElementById('output02');
    var facetSimpleBtn = document.getElementById('facet-simple');
    var facetPropertiesBtn = document.getElementById('facet-properties');
    var facetTextBtn = document.getElementById('facet-text');

    document.addEventListener('asyncjs-built', function (evt) {
        update(input02, asyncjsIndex, output02, 'facets');
    }, false);

    input02.addEventListener('input', function (evt) {
        update(input02, asyncjsIndex, output02, 'facets');
    }, false);


    facetSimpleBtn.addEventListener('click', function (evt) {
        parseJsonFromElt(input02, function (err, json) {
            if (json) {
                delete json.facets.limit;
                delete json.facets.lowerCase;
                delete json.text;
                input02.value = js_beautify(JSON.stringify(json));
            } else {
                input02.value = js_beautify(JSON.stringify({ "facets": { "path": "tags" } }));
            }
            update(input02, asyncjsIndex, output02, 'facets');
        });
    }, false);


    facetPropertiesBtn.addEventListener('click', function (evt) {
        parseJsonFromElt(input02, function (err, json) {
            if (json) {
                delete json.text;
                json.facets.limit = 7;
                json.facets.lowerCase = false;
                input02.value = js_beautify(JSON.stringify(json));
            } else {
                input02.value = js_beautify(JSON.stringify({
                    "facets": {
                        "path": "tags",
                        "limit": 7,
                        "lowerCase": false
                    }
                }));
            }
            update(input02, asyncjsIndex, output02, 'facets');
        });
    }, false);


    facetTextBtn.addEventListener('click', function (evt) {
        parseJsonFromElt(input02, function (err, json) {
            if (json) {
                json.text = "css";
                json.facets.limit = 7;
                json.facets.lowerCase = false;
                input02.value = js_beautify(JSON.stringify(json));
            } else {
                input02.value = js_beautify(JSON.stringify({
                    "text": "css",
                    "facets": {
                        "path": "tags",
                        "limit": 7,
                        "lowerCase": false
                    }
                }));
            }
            update(input02, asyncjsIndex, output02, 'facets');
        });
    }, false);



    // --------------------------

    var input03 = document.getElementById('input03');
    var output03 = document.getElementById('output03');
    var structuredSimpleBtn = document.getElementById('structured-simple');
    var structuredOpBtn = document.getElementById('structured-op');
    var structuredComplexBtn = document.getElementById('structured-complex');

    document.addEventListener('asyncjs-built', function (evt) {
        update(input03, asyncjsIndex, output03, 'text');
    }, false);

    input03.addEventListener('input', function (evt) {
        update(input03, asyncjsIndex, output03, 'text');
    }, false);


    structuredSimpleBtn.addEventListener('click', function (evt) {
        parseJsonFromElt(input03, function (err, json) {
            input03.value = js_beautify(JSON.stringify({
                "query": {
                    "sponsors": null
                }
            }));
            update(input03, asyncjsIndex, output03, 'text');
        });
    }, false);


    structuredOpBtn.addEventListener('click', function (evt) {
        parseJsonFromElt(input03, function (err, json) {
            input03.value = js_beautify(JSON.stringify({
                "query": {
                    "date": { "$gt": "2014" }
                }
            }));
            update(input03, asyncjsIndex, output03, 'text');
        });
    }, false);


    structuredComplexBtn.addEventListener('click', function (evt) {
        parseJsonFromElt(input03, function (err, json) {
            input03.value = js_beautify(JSON.stringify({
                "query": {
                    "date": {
                        "$gt": "2014",
                        "$lt": "2016"
                    },
                    "sponsors": null
                }
            }));
            update(input03, asyncjsIndex, output03, 'text');
        });
    }, false);




    // --------------------------


    var input04 = document.getElementById('input04');
    var output04 = document.getElementById('output04');
    var geoNearbyBtn = document.getElementById('geo-nearby');
    var geoOffsetBtn = document.getElementById('geo-offset');
    var geoComplexBtn = document.getElementById('geo-complex');

    document.addEventListener('places-built', function (evt) {
        update(input04, placesIndex, output04, 'places');
    }, false);

    input04.addEventListener('input', function (evt) {
        update(input04, placesIndex, output04, 'places');
    }, false);


    geoNearbyBtn.addEventListener('click', function (evt) {
        parseJsonFromElt(input04, function (err, json) {
            input04.value = js_beautify(JSON.stringify({
                'nearby': {
                    'longitude': -0.14292,
                    'latitude': 50.82106
                }
            }));
            update(input04, placesIndex, output04, 'places');
        });
    }, false);


    geoOffsetBtn.addEventListener('click', function (evt) {
        parseJsonFromElt(input04, function (err, json) {
            input04.value = js_beautify(JSON.stringify({
                'nearby': {
                    'longitude': -0.14292,
                    'latitude': 50.82106,
                    'offset': 1
                }
            }));
            update(input04, placesIndex, output04, 'places');
        });
    }, false);


    geoComplexBtn.addEventListener('click', function (evt) {
        parseJsonFromElt(input04, function (err, json) {
            input04.value = js_beautify(JSON.stringify({
                'nearby': {
                    'longitude': -0.14292,
                    'latitude': 50.82106
                },
                'query': { 'tags': 'pub' }
            }));
            update(input04, placesIndex, output04, 'places');
        });
    }, false);


});