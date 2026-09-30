const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const additionalCloseButtons = document.querySelectorAll('[data-close-dialog]');
const selectedProductInput = document.getElementById('selected-product');
const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

if (orderDialog && selectedProductInput) {
    orderButtons.forEach((button) => {
        button.addEventListener('click', () => {
            selectedProductInput.value = button.dataset.product || '';
            orderDialog.showModal();
        });
    });

    const closeDialog = () => orderDialog.close();

    if (closeDialogButton) {
        closeDialogButton.addEventListener('click', closeDialog);
    }

    additionalCloseButtons.forEach((button) => {
        button.addEventListener('click', closeDialog);
    });
}

if (orderForm && orderDialog && successMessage) {
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formElements = Array.from(orderForm.elements);

        formElements.forEach((element) => {
            if (element.willValidate) {
                element.removeAttribute('aria-invalid');
            }
        });

        if (!orderForm.checkValidity()) {
            formElements.forEach((element) => {
                if (element.willValidate && !element.checkValidity()) {
                    element.setAttribute('aria-invalid', 'true');
                }
            });

            orderForm.reportValidity();
            return;
        }

        successMessage.hidden = false;
        orderForm.reset();
        orderDialog.close();
    });
}