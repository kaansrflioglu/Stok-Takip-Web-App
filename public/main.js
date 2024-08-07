document.addEventListener('DOMContentLoaded', () => {
    const updateModal = document.getElementById('updateModal');
    const updateForm = document.getElementById('updateForm');
    const itemInput = document.getElementById('item');
    const sizeSelect = document.getElementById('size');
    const quantityInput = document.getElementById('quantity');

    updateModal.addEventListener('show.bs.modal', (event) => {
        const button = event.relatedTarget;
        const id = button.getAttribute('data-id');
        const item = button.getAttribute('data-item');

        updateForm.action = `/spare-parts/update/${id}`;
        itemInput.value = item;
    });

    updateForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const id = updateForm.action.split('/').pop();
        const size = sizeSelect.value;
        const quantity = quantityInput.value;

        fetch(`/spare-parts/update/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ [`${size.toLowerCase()}_quantity`]: quantity })
        })
            .then(response => {
                if (response.ok) {
                    window.location.reload();
                } else {
                    return response.text().then(text => { throw new Error(text) });
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
