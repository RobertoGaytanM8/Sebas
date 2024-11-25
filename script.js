document.addEventListener('DOMContentLoaded', function() {
    const products = document.querySelectorAll('.product');
    const cartList = document.querySelector('.cart-list');
    const totalElement = document.querySelector('.total-value');
    const ivaElement = document.querySelector('.iva-value');
    const totalWithIvaElement = document.querySelector('.total-with-iva-value');
    const clearCartButton = document.querySelector('.clear-cart');
    const pagarButton = document.querySelector('.pagar');

    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

    products.forEach(product => {
        const addToCartButton = product.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', () => addToCart(product));
    });

    clearCartButton.addEventListener('click', clearCart);
    pagarButton.addEventListener('click', pagar);

    updateCartUI(); // Asegurarse de que el carrito se actualice al cargar la página

    function addToCart(product) {
        const productId = product.dataset.id;
        const productName = product.dataset.name;
        const productPrice = parseFloat(product.dataset.price);
        const productImage = product.querySelector('img').src; // Obtener la ruta de la imagen del producto

        const existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, image: productImage, quantity: 1 }); // Agregar la ruta de la imagen al objeto del producto en el carrito
        }
        updateCartUI();
    }

    function updateCartUI() {
        cartList.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <img src="${item.image}" style="max-width: 50px; max-height: 50px;"> 
                ${item.name} x${item.quantity}  $${(item.price * item.quantity).toFixed(2)}`;
            cartList.appendChild(listItem);
            total += item.price * item.quantity;
        });

        const iva = calculateIVA(total); // Calcular el IVA
        ivaElement.textContent = `${iva.toFixed(2)}`; // Mostrar el valor del IVA
        totalWithIvaElement.textContent = `${(total + iva).toFixed(2)}`; // Mostrar el costo total de la compra incluyendo el IVA
        totalElement.textContent = `${total.toFixed(2)}`; // Mostrar el costo total de la compra

        const removeButtons = document.querySelectorAll('.remove-item');

        removeButtons.forEach(button => {
            button.addEventListener('click', () => removeItem(button.dataset.id));
        });

        // Almacenar el carrito actualizado en sessionStorage
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }

    function calculateIVA(total) {
        // Supongamos un IVA del 16%
        const ivaRate = 0.16;
        return total * ivaRate;
    }

    function clearCart() {
        cart = [];
        updateCartUI();
    }

    function pagar() {
        clearCart();
        // Mostrar un mensaje de agradecimiento al pagar el carrito
        alert('¡Gracias por su compra!');
    }
});
