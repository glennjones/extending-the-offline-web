


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
            results = asyncjsIndex.search(event.data.query);
            self.postMessage({'messageType': 'results', 'documents': results });
        }

        /*
        var index = lunr(function (){
            this.field('Name');
            this.field('Code');
            this.field('Instructions_Includes');
            this.field('Instructions_Excludes');
            this.field('Instructions_Notes');
            this.field('Instructions_Terminology');
            this.field('Instructions_Morbidity');
            this.ref('Id');
        });
        _.each(e.data, function (document) { index.add(document); });
        self.postMessage(JSON.stringify(index.toJSON()));
        */
        }, false);

}());