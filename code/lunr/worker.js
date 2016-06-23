


(function (){

    self.importScripts('lunr.js');

    var asyncjsIndex = lunr(function () {
        this.field('title', {boost: 30})
        this.field('tags')
        this.ref('id')
    })


    self.addEventListener('message', function (event){
        //console.log(JSON.stringify(event.data));

        if(event.data.messageType === 'add'){
            event.data.documents.forEach(function(item){
                asyncjsIndex.add(item);
            })
            self.postMessage({'messageType': 'ready'});
        }

        if(event.data.messageType === 'search'){
            results = asyncjsIndex.search(event.data.query);
            self.postMessage({'messageType': 'results', 'documents': results });
        }


        }, false);

}());