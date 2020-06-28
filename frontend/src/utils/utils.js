'use strict';

var os = require('os');
var ifaces = os.networkInterfaces();


function getIPaddress(ifaces) {
    for (var ifname in ifaces){
        for (var i=0; i<ifaces[ifname].length; ++i){
            var iface = ifaces[ifname][i]
            if ('IPv4' !== iface.family || iface.internal !== false){
                continue
            }
            return (iface.address)
        }
    }

}

console.log(getIPaddress(ifaces))