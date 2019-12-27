'use strict'

import { desc, url, Person } from './modules/mod1'
import Util from 'Utilities/util.js'
let person = new Person()
console.log(person.getHello() + person.getName())
console.log(desc)
console.log(url)
console.log(Util.proxy)

// jquery
$(function() {
    let www = Util.proxy
    $('.wrap')
        .find('p')
        .text(`hello jquery project ${www}`)
})
