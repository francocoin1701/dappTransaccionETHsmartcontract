const Web3 = require('web3');
const artifac = require('../build/contracts/francoToken.json')

window.onload =()=> {
    //variables
    let web3;
    let from;
    let FrancoToken;

    //elementos content
    const content = document.getElementById('content');
    const connectButon = document.getElementById('connect');
    const recipent = document.getElementById('recipent');

    //elementos form
    const send = document.getElementById('send');
    const direction = document.getElementById('direccion');
    const monto = document.getElementById('amount')

    //formErc20
    const sendErc20 = document.getElementById('sendErc20');
    const cantidad = document.getElementById('cantidad');
    const direccionErc20 = document.getElementById('direccionErc20');
    const amountErc20 = document.getElementById('amountErc20');

    //funciones
    const conectar = async()=>{
        if(window.ethereum){
            try {
                await window.ethereum.request({method: 'eth_requestAccounts'})
                web3 = new Web3(window.ethereum);
                let acounts = await web3.eth.getAccounts();
                from = acounts[0];
                FrancoToken = new web3.eth.Contract(
                    artifac.abi,
                    artifac.networks[5777].address
                );
                const balanceErc20 = await FrancoToken.methods.balanceOf(from).call();
                cantidad.innerHTML = balanceErc20;
                content.style.display = 'initial'
                connectButon.style.display = 'none';
                recipent.innerHTML = from;
                
            } catch (error) {
                alert('rechasaste la coneccion', error)
                
            }
        }else{
            alert('instala metamask en la red de ganache')
        }

    }
    const transaccion = (e)=>{
        e.preventDefault();
        let address = direction.value;
        let cantidad = monto.value;

        if(Number(cantidad)<= 0){
            alert('el monto a enviar es incorrecto');
            return;
        }
        if(!web3.utils.isAddress(address)){
            alert('la direccion no pertenese ala red de ethereum')
            return
        }
        web3.eth.sendTransaction({
            from: from,
            to: address,
            value: cantidad
        });
    } 
    const transacErc20 = (e)=>{
        e.preventDefault();
        let address =  direccionErc20.value;
        let monto = amountErc20.value;
        
        if(Number(monto) <= 0){
            alert('el monto no es suficiente');
            return;
        }
        if(!web3.utils.isAddress(address)){
            alert('la direccion no es correcta');
            return;
        }
        FrancoToken.methods.transfer(from,address,monto).send({from,})
    }
    
    //llamado funciones
    connectButon.onclick = conectar;
    send.onsubmit = transaccion;
    sendErc20.onsubmit = transacErc20;

}