


(function (){

    self.importScripts('lunr.js','../getListings.js');


    var docs = [];

    var asyncjsIndex = lunr(function () {
        this.field('title', {boost: 30})
        this.field('tags')
        this.ref('id')
    })


    self.addEventListener('message', function (event){
        //console.log(JSON.stringify(event.data));

        if(event.data.messageType === 'add'){
            docs = event.data.documents;
            event.data.documents.forEach(function(item){
                asyncjsIndex.add(item);
            })
            self.postMessage({'messageType': 'ready'});
        }

        if(event.data.messageType === 'search'){
            results = getItemsFromResults( asyncjsIndex.search(event.data.query), docs);

            self.postMessage({'messageType': 'results', 'documents': results });
        }

    }, false);

}());
