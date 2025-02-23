// creating the results table
const getTableData = async () => {
    const response = await fetch("/data/all", { method: "GET" });

    const text = await response.text();
    const data = JSON.parse(text);
    console.log(data);

    return data;
};

const deleteData = async function (event) {
    event.preventDefault();
    const json = {
        _id: event.originalTarget.dataset._id,
        collection: event.originalTarget.dataset.collection_name
    };

    const response = await fetch("/data/delete", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(json),
    });

    const text = await response.text();
    const data = JSON.parse(text);

    return data;
};

const changeData = async function (event, value) {
    event.preventDefault();
    const dataField = event.originalTarget.parentNode;
    const json = {
        collection: dataField.parentNode.parentNode.parentNode.id,
        field: {
            _id: dataField.parentNode.dataset._id,
            key: dataField.dataset.key,
            value: dataField.dataset.value,
        },
        value: value
    };
    console.log(json);

    const response = await fetch("/data/change", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(json),
    });
};

export const Results = {
    render: async () => {
        const data = await getTableData();

        const page = document.createElement("div");
        page.classList.add("page-container");

        for (let index = 0 ; index < data.length ; ++index) {
            const collection      = data[index];
            const collection_data = collection.data;
            const collection_name = collection.name;

            const header = document.createElement("h1");
            header.textContent = collection_name;

            const table = document.createElement("table");
            table.id = collection_name;
            const headerrow = document.createElement("tr");

            // dynamically creating table headers
            for (const [key, value] of Object.entries(collection_data[0])) {
                const headers = document.createElement("th");
                headers.innerHTML = key;
                headers.setAttribute("headers", key);
                headerrow.appendChild(headers);
            }
            // column for deleting data
            const deletecolumn = document.createElement("th");
            headerrow.appendChild(deletecolumn);
            table.append(headerrow);

            // dynamically creating data rows
            for (let i = 0; i < collection_data.length; i++) {
                const { _id, name } = collection_data[i];

                const row = document.createElement("tr");
                row.dataset._id = _id;

                for (const [key, value] of Object.entries(collection_data[i])) {
                    const tabledata = document.createElement("td");
                    tabledata.classList.add("table-cell");
                    tabledata.dataset.value = value.toString();
                    tabledata.dataset.key   = key.toString();
                    tabledata.setAttribute("header", key + "-" + (i + 1));

                    tabledata.textContent = value.toString();
                    row.appendChild(tabledata);
                }

                const deletecell = document.createElement("td");
                const deletebutton = document.createElement("button");

                deletecell.classList.add("delete-cell");

                deletebutton.setAttribute("id", i.toString());
                deletebutton.dataset._id = _id;
                deletebutton.dataset.collection_name = collection_name;
                deletebutton.classList.add("delete-button");
                deletebutton.textContent = "delete";

                deletecell.append(deletebutton);
                row.appendChild(deletecell);
                table.appendChild(row);
            }

            const container = document.createElement("div");
            const div = document.createElement("div");

            container.classList.add("result-table-container");
            div.classList.add("result-table");

            div.appendChild(table);
            container.appendChild(header);
            container.appendChild(div);
            page.appendChild(container);
        }

        return page.outerHTML;
    },

    after_render: () => {
        // state variables for table editing
        let tablefocused = false;
        let prevdata;

        const tabledatas = document.getElementsByClassName("table-cell");
        for (let i = 0; i < tabledatas.length; i++) {
            const tabledata = tabledatas[i];

            // shenanigans to create a text input when clicking on a data cell
            // and returning the text input to its original state. Also only
            // allows users to edit one field at a time.
            tabledata.onclick = () => {
                tablefocused = true;

                if (!tabledata.firstChild) {
                    console.warn("There is no data to edit");
                    return;
                }

                if (tabledata.firstChild.nodeType !== 3 && !tablefocused) {
                    return;
                }

                let input = document.createElement("input");
                input.setAttribute("id", `${tabledata.attributes.header.value}`);
                input.setAttribute("size", 1);
                input.classList.add("editable-field");

                input.onblur = () => {
                    tablefocused = false;
                    input.parentNode.innerHTML = prevdata;
                };

                input.onkeydown = (event) => {
                    const newdata = input.value;
                    switch (event.key) {
                        case "Escape":
                            input.blur();
                            break;
                        case "Enter":
                            prevdata = newdata;
                            changeData(event, newdata);
                            input.blur();
                            break;
                    }
                };

                // more shenanigans to prevent onclick events from tabledata to fire
                input.onclick = (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    event.stopImmediatePropagation();
                };

                prevdata = tabledata.firstChild.nodeValue;
                input.value = tabledata.textContent;
                tabledata.removeChild(tabledata.firstChild);
                tabledata.appendChild(input);
                document.getElementById(tabledata.attributes.header.value).focus();
            };
        }

        const deletebuttons = document.getElementsByClassName("delete-button");
        for (let i = 0; i < deletebuttons.length; i++) {
            const deletebutton = deletebuttons[i];
            deletebutton.onclick = async (event) => {
                await deleteData(event).then(() => {
                    const table = document.getElementById(event.originalTarget.dataset.collection_name);
                    table.deleteRow(Number(event.originalTarget.id) + 1);
                });
            };
        }
    },
};

export default Results;
