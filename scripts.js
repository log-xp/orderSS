document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById("order-form");
    const addItemButton = document.getElementById("add-item");
    const currentOrderTable = document.getElementById("current-order").getElementsByTagName("tbody")[0];
    const individualSummary = document.getElementById("individual-summary").getElementsByTagName("tbody")[0];
    const itemSummary = document.getElementById("item-summary").getElementsByTagName("tbody")[0];

    const itemPrices = {
        "Item1": 10,
        "Item2": 20,
        "Item3": 30
    };

    let currentOrder = {};

    addItemButton.addEventListener("click", () => {
        const item = document.getElementById("item").value;
        const quantity = parseInt(document.getElementById("quantity").value, 10);

        if (currentOrder[item]) {
            currentOrder[item] += quantity;
        } else {
            currentOrder[item] = quantity;
        }

        updateCurrentOrderTable();
    });

    orderForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        let totalCost = 0;

        for (const item in currentOrder) {
            const quantity = currentOrder[item];
            const itemTotalCost = itemPrices[item] * quantity;
            totalCost += itemTotalCost;

            updateItemSummary(item, quantity);
        }

        const newRow = individualSummary.insertRow();
        newRow.insertCell().textContent = name;
        newRow.insertCell().textContent = `$${totalCost}`;

        orderForm.reset();
        currentOrder = {};
        updateCurrentOrderTable();
    });

    function updateCurrentOrderTable() {
        currentOrderTable.innerHTML = '';

        for (const item in currentOrder) {
            const newRow = currentOrderTable.insertRow();
            newRow.insertCell().textContent = item;
            newRow.insertCell().textContent = currentOrder[item];
        }
    }

    function updateItemSummary(item, quantity) {
        let existingRow;

        for (const row of itemSummary.rows) {
            if (row.cells[0].textContent === item) {
                existingRow = row;
                break;
            }
        }

        if (existingRow) {
            const currentQuantity = parseInt(existingRow.cells[1].textContent, 10);
            existingRow.cells[1].textContent = currentQuantity + quantity;
        } else {
            const newRow = itemSummary.insertRow();
            newRow.insertCell().textContent = item;
            newRow.insertCell().textContent = quantity;
        }
    }
});
