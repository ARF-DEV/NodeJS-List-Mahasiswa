
//Menambahkan EventListener untuk Onclick Event
document.getElementById('btn-submit').addEventListener('click' , async (event) => {

    const name = document.getElementById('name');
    const nim = document.getElementById('nim');
    const prodi = document.getElementById('prodi');
    const data = {name: name.value, nim: nim.value, prodi: prodi.value};
    console.log('P');

    //Mengirim POST request ke alamat api/add
    fetch('api/add', {
        method:"POST",
            headers:{
                'Content-Type': 'application/json',
        },
            body: JSON.stringify(data),
        })
        .then( res => {
            console.log(`Request sent`);
            name.value = '';
            nim.value = '';
            prodi.value = '';
        })
        .catch( (err) => console.log(`ERROR : ${err}`));
    });