


(function (){

    self.importScripts('/mani/mani.js');

  // create asyncjs index
    var options = {
        'text': [
            { 'path': 'title', 'boost': 20 },
            { 'path': 'tags' },
            { 'path': 'text' },
        ]
    }
    asyncjsIndex = new Mani(options);


    self.addEventListener('message', function (event){
        //console.log(JSON.stringify(event.data));

        if(event.data.messageType === 'add'){
            asyncjsIndex.add(event.data.documents);
            self.postMessage({'messageType': 'ready'});
        }

        if(event.data.messageType === 'search'){
            results = getReducedData( asyncjsIndex.search(event.data.query).items );
            self.postMessage({'messageType': 'results', 'documents': results });
        }

        }, false);


    function getReducedData( results ){
        return results.map(function(item){
            return {
                title: item.title,
                score: item.score
            }
        })
    }

}());