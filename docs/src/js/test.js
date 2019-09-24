import num from './support.js';
import str from './models/TestModel';
import { sum, multiply, PI } from './views/testView';
import { sum as s, multiply as m, PI as p } from './views/testView';
import * as testView from './views/testView';
import dft from './views/testView';
import minus from './views/testView';
import { subtract, division } from './views/testView';
import axios from 'axios';

{
    console.log(`Default value is ${dft} and minus value is ${minus}`);
    console.log('Index.js file executed!!!');

    const value = 420;
    console.log(`data imported from support.js file is ${num} which es6 value ${value}`);


    console.log(`imported default string is - ${str} and add function result is - ${sum(PI, 4)} and multiply() result is - ${multiply(PI, 4)} and value of PI is - ${PI}`);

    console.log(`imported default string is - ${str} and add function result is - ${s(PI, 4)} and multiply() result is - ${m(PI, 4)} and value of PI is - ${p}`);

    console.log(`imported default string is - ${str} and add function result is - ${testView.sum(PI, 4)} and multiply() result is - ${testView.multiply(PI, 4)} and value of PI is - ${testView.PI}`);

    console.log(`Default exported value is - ${dft}`);
    console.log(`subtract - ${subtract(10, 2)} and division - ${division(10, 2)}`);

    const getRecipesUsingAxiosLib = async (query) => {

        const apiKey = '551b20380c935de728283ad59b3686e4';
        const apiUrlForRecipesSearch = 'https://www.food2fork.com/api/search';

        try {
            const response = await axios.get(`${apiUrlForRecipesSearch}?key=${apiKey}&q=${query}`);
            console.log(response);
            console.log(response.data.recipes);
        } catch (error) {
            console.log(`${error} - error my`);
        }
    }

    // getRecipesUsingAxiosLib('pizza');

    const getRecipesUsingFetch = async (query) => {

        const apiKey = '551b20380c935de728283ad59b3686e4';
        const apiUrlForRecipesSearch = 'https://www.food2fork.com/api/search';

        try {
            const response = await fetch(`${apiUrlForRecipesSearch}?key=${apiKey}&q=${query}`);

            const jsonData = await response.json();
            console.log(` ${response} - response`);
            console.log(`${jsonData} - dataJson`);
            console.log(jsonData.recipes);

        } catch (error) {
            console.log(` ${error} - my eeror`);
        }



    };

    // getRecipesUsingFetch('pizza');


}
