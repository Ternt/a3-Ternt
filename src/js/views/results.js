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

    const body = event.originalTarget.id;
    const response = await fetch("/delete", {
        method: "POST",
        body,
    });

    const text = await response.text();
    const data = JSON.parse(text);

    return data;
};

const changeData = async function (event, value) {
    console.log(event.originalTarget);

    const json = { id: event.originalTarget.id, value: value };
    const body = JSON.stringify(json);
    const response = await fetch("/change", {
        method: "POST",
        body,
    });

    const text = await response.text();
    const data = JSON.parse(text);

    return data;
};

export const Results = {
    render: async () => {
        const data = await getTableData();

        const page = document.createElement("div");
        page.classList.add("page-container");

        for (let collection = 0 ; collection < data.length ; ++collection) {
            const appdata = data[collection];
            const table = document.createElement("table");
            const headerrow = document.createElement("tr");

            // dynamically creating table headers
            for (const [key, value] of Object.entries(appdata[0])) {
                if (key === "_id") {
                    continue; 
                }

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
            for (let i = 0; i < appdata.length; i++) {
                const row = document.createElement("tr");

                for (const [key, value] of Object.entries(appdata[i])) {
                    if (key === "_id") {
                        continue; 
                    }

                    const tabledata = document.createElement("td");
                    tabledata.classList.add("table-cell");
                    tabledata.setAttribute("header", key + "-" + (i + 1));

                    tabledata.innerHTML = value;
                    row.appendChild(tabledata);
                }

                const deletecell = document.createElement("td");
                const deletebutton = document.createElement("button");

                deletecell.classList.add("delete-cell");

                deletebutton.setAttribute("id", i.toString());
                deletebutton.classList.add("delete-button");
                deletebutton.innerHTML = "delete";

                deletecell.append(deletebutton);
                row.appendChild(deletecell);
                table.appendChild(row);
            }

            const container = document.createElement("div");
            const div = document.createElement("div");

            container.classList.add("result-table-container");
            div.classList.add("result-table");

            div.appendChild(table);
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
                    const table = document.querySelector("table");
                    table.deleteRow(Number(event.originalTarget.id) + 1);
                });
            };
        }
    },
};

export default Results;
