const footer = document.createElement('footer');
footer.innerHTML = `<footer>
                        <nav>
                            <a href="home.html">
                                <button>
                                    <i class="fas fa-home icon"></i>
                                    <span class="tooltip">Home</span>
                                </button>
                            </a>
                            <a href="skills.html">
                                <button>
                                    <i class="fas fa-code icon"></i>
                                    <span class="tooltip">Skills</span>
                                </button>
                            </a>
                            <a href="about.html">
                                <button>
                                    <i class="fas fa-user icon"></i>
                                    <span class="tooltip">About</span>
                                </button>
                            </a>
                            <a href="contact.html">
                                <button>
                                    <i class="fas fa-envelope icon"></i>
                                    <span class="tooltip">Contact</span>
                                </button>
                            </a>
                        </nav>
                    </footer>`;

document.body.appendChild(footer);