

// return document by id
getItemById = function ( id, docs ) {
	var out = null,
		i = docs.length,
		x = 0;

	while (x < i) {
	    if(docs[x].id === id){
	    	var out =  {
				'id': id,
				'title': docs[x].title
			};
	    	break;
	    }
	    x++;
	}
	return out;
}


// return items based on fts results
getItemsFromResults = function ( results, docs ){
	var out = [],
		i = 0,
		x = 0;

	if(Array.isArray(results)){
		i = results.length;
		while (x < i) {
			var id = parseInt(results[x].ref,10);
			var item = this.getItemById( id, docs );

			// add free text score
			if(results[x].score !== undefined){
				item.score = results[x].score;
			}

			// add geo distance
			if(results[x].distance !== undefined){
				item.distance = results[x].distance;
			}

	    	out.push(item);
		    x++;
		}
	}

	return out;
}