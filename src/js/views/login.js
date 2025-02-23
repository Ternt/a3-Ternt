const auth = async function (event) {
    event.preventDefault();

    const json = {
        username: document.querySelector("#username").value,
        password: document.querySelector("#password").value,
    };

    const body = JSON.stringify(json);
    try {
        const response = await fetch("/user/auth/login", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: body,
        });

        const result = await response.json();
        if (!result.success) {
            throw new Error(`Failed to login`);
        }

        window.location.replace("http://localhost:3000/");
    } catch (error) {
        console.error(error.message);

        const labelGroup = document.getElementById('user-error');
        const errorDiv = document.getElementsByClassName('error-message');
        if (errorDiv.length < 1) {
            const errorMessage = document.createElement('a');
            errorMessage.classList.add('error-message');
            errorMessage.innerHTML = "User already exists. Try a new username"
            labelGroup.appendChild(errorMessage);

            setTimeout(() => {
                const labelGroup = document.getElementById('user-error');
                labelGroup.removeChild(labelGroup.lastElementChild);
            }, 10000);
        }
    }
};


const gitAuth = async function (event) {
    event.preventDefault();

    const response = await fetch("/user/auth/github", {
        method: "GET",
    });

    const text = await response.text();
    console.log(text);
};

const Login = {
    render: async () => {
        return `
            <div id="main" class="body-section">
                <form class="login-form">
                    <div class="auth-tabs">
                        <button class="tab">
                            <a href="/login">Login</a>
                        </button>
                        <button class="tab">
                            <a href="/signup">Sign Up</a>
                        </button>
                    </div>
                    <div class="form-area">
                    <div class="form-box">
                        <label class="form-label" for="username">Username </label>
                        <input class="form-input" type="text" id="username" value="username">
                    </div>
                    <div class="form-box">
                        <label class="form-label" for="password">Password</label>
                        <input class="form-input" type="text" id="password" value="password">
                    </div>
                    <div class="form-box" id="form-submission">
                        <button class="form-trigger" type="submit" id="form-button">Login</button>
                    </div>
                    <div id="login-error" class="form-label-group">
                    <div class="login-options">
                        <button id="gitLogin" class="actionIcon">
                            <svg height="32" aria-hidden="true" viewBox="0 0 24 24" version="1.1" width="32" data-view-component="true" class="octicon">
                                <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path>
                            </svg> 
                        </button>
                    </div>
                    </div>
                </form>
            </div>`;
    },
    after_render: async () => {
        const button = document.getElementById("form-button");
        button.onclick = auth;

        const gitButton = document.getElementById("gitLogin");
        gitButton.onclick = gitAuth;

        // behaviours for the form input
        let defaultValue;
        const allInput = document.getElementsByClassName("form-input");
        for (let i = 0; i < allInput.length; i++) {
            const input = allInput[i];
            let defaultValue = input.defaultValue;

            input.onkeydown = (event) => {
                if (event.key === "Escape") {
                    if (input.classList[input.classList.length - 1] === "contains-data") {
                        input.classList.remove("contains-data");
                    }
                    input.value = defaultValue;
                    input.addEventListener("input", removeDefault, { once: true });
                    input.blur();
                }
            };

            const removeDefault = (event) => {
                if (event.inputType === "insertText") {
                    defaultValue = input.defaultValue;
                    input.value = event.data;
                }
            };

            input.addEventListener("input", removeDefault, { once: true });

            input.onblur = () => {
                if (input.value.length > 0) {
                    input.classList.add("contains-data");
                } else if (input.value.length === 0) {
                    if (input.classList[input.classList.length - 1] === "contains-data") {
                        input.classList.remove("contains-data");
                    }
                    input.value = defaultValue;
                }
            };
        }

        // behaviours for the password component
        const passwordInput = document.getElementById("password");
        let password = "";

        // removes default text when clicked and changes input type to password
        passwordInput.onfocus = () => {
            defaultValue = passwordInput.defaultValue;
            passwordInput.defaultValue = "";
            passwordInput.type = "password";
        };


        passwordInput.onkeydown = (event) => {
            if (event.key === "Escape") {
                passwordInput.blur();
            }
        };

        passwordInput.oninput = (event) => {
            if (event.inputType === "insertText") {
                password = passwordInput.value;
            }
        };

        passwordInput.onblur = () => {
            passwordInput.defaultValue = defaultValue;
            if (password.length === 0) {
                passwordInput.type = "type";
            }
        };
    },
};

export default Login;
