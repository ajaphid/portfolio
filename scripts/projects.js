
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
            <div class="project-title">${this.title}</div>
            <div class="project-description">${this.description}</div>
            <div class="project-tools">${this.tools}</div>
            <ul class="project-links">
                <li><a href="${this.liveLink}" class="link-button">Live Site</a></li>
                <li><a href="${this.githubLink}" class="link-button">GitHub</a></li>
            </ul>
            <div class="project-image">
                <img src="/assets/${this.desktopImage}" alt="${this.title}">
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