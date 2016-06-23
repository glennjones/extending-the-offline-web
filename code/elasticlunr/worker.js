


(function (){

    self.importScripts('elasticlunr.js','../getListings.js');

    var docs = [];

    var asyncjsIndex = elasticlunr(function () {
        this.addField('title', {boost: 30});
        this.addField('tags');
        this.setRef('id');
        this.saveDocument(false);
    })


    self.addEventListener('message', function (event){
        //console.log(JSON.stringify(event.data));

        if(event.data.messageType === 'add'){
            docs = event.data.documents;
            event.data.documents.forEach(function(item){
                asyncjsIndex.addDoc(item);
            })
            self.postMessage({'messageType': 'ready'});
        }

        if(event.data.messageType === 'search'){
            results = results = getItemsFromResults( asyncjsIndex.search(event.data.query, {}), docs);
            self.postMessage({'messageType': 'results', 'documents': results });
        }


        }, false);

}());