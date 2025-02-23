import { calculateUUID } from '../util.js'

const register = async function (event) {
    event.preventDefault();

    const json = {
        username: document.querySelector("#username").value,
        firstname: document.querySelector("#firstname").value,
        lastname: document.querySelector("#lastname").value,
        dateofbirth: document.querySelector("#dateofbirth").value,
        password: document.querySelector("#password").value,
    };

    const userId = calculateUUID(json);
    localStorage.setItem(userId, JSON.stringify(json));

    const body = JSON.stringify(json);
    try {
        const response = await fetch("/user/register", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body,
        });

        const result = await response.json();
        if (!result.success) {
            throw new Error(`Failed to register user`);
        }
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

const SignUp = {
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
                        <div id="user-error" class="form-label-group">
                            <label class="form-label" for="username">Username </label>
                        </div>
                        <input class="form-input" type="text" id="username" value="username">
                    </div>
                    <div class="form-group">
                        <div class="form-box">
                            <label class="form-label" for="firstname">First Name</label>
                            <input class="form-input" type="text" id="firstname" value="first name">
                        </div>
                        <div class="form-box">
                            <label class="form-label" for="lastname">Last Name</label>
                            <input class="form-input" type="text" id="lastname" value="last name">
                        </div>
                    </div>
                    <div class="form-box">
                        <label class="form-label" for="dob">Date of Birth</label>
                        <input class="form-input" type="date" id="dateofbirth" value="date of birth">
                    </div>
                    <div class="form-box">
                        <label class="form-label" for="lastname">Password</label>
                        <input class="form-input" type="text" id="password" value="password">
                    </div>
                    <div class="form-box" id="form-submission">
                        <input class="form-trigger" type="button" id="form-button" value="Sign up">
                    </div>
                    </div>
                </form>
            </div>`;
    },

    after_render: async () => {
        const button = document.getElementById("form-button");
        button.onclick = register;

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

export default SignUp;
