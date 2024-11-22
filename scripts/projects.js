
// LATER: go thru array of tools and render them dot separated
// LATER: render specific image/s based on screen size
// LATER: add a hover effect to the project links

function Project(title, description, tools, githubLink, liveLink, desktopImage, mobileImages) {
    this.title = title;
    this.description = description;
    this.tools = tools;

    this.githubLink = githubLink;
    this.liveLink = liveLink;

    this.desktopImage = desktopImage;
    this.mobileImages = mobileImages;

    this.render = () => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');
        projectElement.innerHTML = `
            <div class="project-tile">
                <div class="project-info">
                    <h2 class="project-title">${this.title}</h2>
                    <div class="project-description">${this.description}</div>
                    <div class="project-tools">${this.tools.map(tool => `<span class='tool'>${tool}</span>`).join('<span class="dot"> • </span>')}</div>
                    <ul class="project-links">
                        <li><button><a href="${this.liveLink}" target="_blank" class="link-button">Live Site</a></button></li>
                        <li><button><a href="${this.githubLink}" target="_blank" class="link-button">GitHub</a></button></li>
                    </ul>
                </div>
                <div class="project-image">
                    <img src="assets/${this.desktopImage}" alt="${this.title}">
                </div>
            </div>
        `;

        console.log('project made!');
        return projectElement;
    }
}

async function loadProjects() {
    const projectSection = document.querySelector('#projects');
    fetch('./data/projects.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(project => {
            const newProject = new Project(
                project.title,
                project.description,
                project.tools,
                project['github-link'],
                project['live-link'],
                project['desktop-image'],
                project['mobile-images']
            )
            projectSection.appendChild(newProject.render());
        })
    })
    .catch(err => {
        console.error('Error loading projects: ', err)
    });
}

export { loadProjects };