import * as React from 'react';

const dateFormat = (value) => {

	let result = '';
	if(value) {
		const date = value;

	    //date
	    const dateFormat = '0'+date.getDate();
	    const dateNum = dateFormat.substr(-2);

	    //month
	    const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

	    result = dateNum+' '+monthNames[date.getMonth()]+' '+date.getFullYear();
	}
    return result;
}

export default dateFormat;

