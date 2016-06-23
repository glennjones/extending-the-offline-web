


(function (){

    self.importScripts('elasticlunr.js');

    var asyncjsIndex = elasticlunr(function () {
        this.addField('title', {boost: 30});
        this.addField('tags');
        this.setRef('id');
        this.saveDocument(false);
    })


    self.addEventListener('message', function (event){
        //console.log(JSON.stringify(event.data));

        if(event.data.messageType === 'add'){
            event.data.documents.forEach(function(item){
                asyncjsIndex.addDoc(item);
            })
            self.postMessage({'messageType': 'ready'});
        }

        if(event.data.messageType === 'search'){
            results = asyncjsIndex.search(event.data.query);
            self.postMessage({'messageType': 'results', 'documents': results });
        }


        }, false);

}());