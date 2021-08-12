
//Menambahkan EventListener untuk Onclick Event
window.addEventListener('click', async (event) => {
    // logic dijalankan jika HTML element yang di click memiliki class btn-delete
    if(event.target.classList.contains('btn-delete'))
    {
        const btn = event.target;
        const id = btn.dataset.id;

        //Mengirim DELETE request ke server dengan alamat /api/delete/:id
        fetch(`/api/delete/${id}`, {
            method: "DELETE",
        })
        .then(() => {console.log('Data deleted!'); window.location.reload()})
        .catch( err => {console.log(`Error ${err}`)})
    }
})