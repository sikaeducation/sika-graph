const data = {
	"groups": [
		{
			"id": "quality",
			"label": "Quality Concepts",
			"background-color": "hsla(120, 50%, 50%, 0.1)",
			"foreground-color": "hsla(120, 50%, 50%, 0.4)"
		},
		{
			"id": "code-quality",
			"label": "Code Quality",
			"background-color": "hsla(150, 50%, 50%, 0.1)",
			"foreground-color": "hsla(150, 50%, 50%, 0.4)"
		},
		{
			"id": "storybook",
			"label": "Storybook",
			"background-color": "hsla(300, 50%, 50%, 0.1)",
			"foreground-color": "hsla(300, 50%, 50%, 0.4)"
		},
		{
			"id": "typescript",
			"label": "TypeScript",
			"background-color": "hsla(0, 50%, 50%, 0.1)",
			"foreground-color": "hsla(0, 50%, 50%, 0.4)"
		},
		{
			"id": "jest",
			"label": "Jest",
			"background-color": "hsla(240, 50%, 50%, 0.1)",
			"foreground-color": "hsla(240, 50%, 50%, 0.4)"
		},
		{
			"id": "playwright",
			"label": "Playwright",
			"background-color": "hsla(210, 50%, 50%, 0.1)",
			"foreground-color": "hsla(210, 50%, 50%, 0.4)"
		},
		{
			"id": "agile",
			"label": "Agile",
			"background-color": "hsla(180, 50%, 50%, 0.1)",
			"foreground-color": "hsla(180, 50%, 50%, 0.4)"
		}
	],
	"nodes": [
		{
			"id": "Quality",
			"group": "quality",
			"critical": true,
			"complete": true
		},
		{
			"id": "Naming",
			"group": "code-quality",
			"critical": true,
			"complete": true
		},
		{
			"id": "Security",
			"group": "code-quality"
		},
		{
			"id": "Modularity",
			"group": "quality"
		},
		{
			"id": "Accessibility",
			"group": "quality",
			"critical": true
		},
		{
			"id": "CI/CD",
			"group": "agile"
		},
		{
			"id": "GitHub Actions",
			"group": "agile"
		},
		{
			"id": "JavaScript Refactoring",
			"group": "code-quality",
			"critical": true
		},
		{
			"id": "Configure TypeScript",
			"group": "typescript"
		},
		{
			"id": "Setup TypeScript",
			"group": "typescript",
			"in_progress": true
		},
		{
			"id": "TypeScript Simple Types",
			"group": "typescript",
			"in_progress": true
		},
		{
			"id": "TypeScript Generic Types",
			"group": "typescript"
		},
		{
			"id": "TypeScript Object Types",
			"group": "typescript"
		},
		{
			"id": "Progressive Typing",
			"group": "typescript"
		},
		{
			"id": "React TypeScript",
			"group": "typescript"
		},
		{
			"id": "Progressive React Typing",
			"group": "typescript"
		},
		{
			"id": "TypeScript Jest",
			"group": "typescript"
		},
		{
			"id": "AXE",
			"group": "code-quality"
		},
		{
			"id": "React Performance Testing",
			"group": "code-quality"
		},
		{
			"id": "Browser Performance Testing",
			"group": "code-quality"
		},
		{
			"id": "Jest Sockets",
			"group": "jest"
		},
		{
			"id": "Jest Time",
			"group": "jest"
		},
		{
			"id": "Configure Jest",
			"group": "jest"
		},
		{
			"id": "Setup Jest",
			"group": "jest",
			"critical": true
		},
		{
			"id": "Simple Jest Tests",
			"group": "jest",
			"critical": true
		},
		{
			"id": "MSW",
			"group": "jest"
		},
		{
			"id": "Intro to Refactoring",
			"group": "code-quality",
			"critical": true
		},
		{
			"id": "Big O",
			"group": "code-quality"
		},
		{
			"id": "Jest Mocks",
			"group": "jest",
			"critical": true
		},
		{
			"id": "Jest Spies",
			"group": "jest",
			"critical": true,
			"complete": true
		},
		{
			"id": "Jest Hooks",
			"group": "jest"
		},
		{
			"id": "Jest React Components",
			"group": "jest"
		},
		{
			"id": "Jest a11y Testing",
			"group": "jest"
		},
		{
			"id": "Accessibility Testing",
			"group": "quality"
		},
		{
			"id": "Testing Strategy",
			"group": "agile"
		},
		{
			"id": "Types",
			"group": "typescript",
			"critical": true
		},
		{
			"id": "Quality Evaluation",
			"group": "quality",
			"critical": true
		},
		{
			"id": "Storybook Setup",
			"group": "storybook"
		},
		{
			"id": "Configuring Storybook",
			"group": "storybook"
		},
		{
			"id": "Storybook Stories",
			"group": "storybook"
		},
		{
			"id": "Storybook Docs",
			"group": "storybook"
		},
		{
			"id": "Storybook Tests",
			"group": "storybook",
			"critical": true
		},
		{
			"id": "Storybook a11y Testing",
			"group": "storybook"
		},
		{
			"id": "Playwright Scraping",
			"group": "playwright",
			"critical": true
		},
		{
			"id": "Playwright Setup",
			"group": "playwright",
			"critical": true
		},
		{
			"id": "Configuring Playwright",
			"group": "playwright"
		},
		{
			"id": "Playwright Test",
			"group": "playwright",
			"critical": true
		},
		{
			"id": "Playwright Advanced Assertions",
			"group": "playwright"
		},
		{
			"id": "Playwright Advanced Testing",
			"group": "playwright"
		},
		{
			"id": "Playwright Running Scripts",
			"group": "playwright"
		},
		{
			"id": "Playwright a11y Testing",
			"group": "playwright"
		},
		{
			"id": "Documentation",
			"group": "quality",
			"critical": true
		}
	],
	"links": [
		{
			"source": "Quality",
			"target": "Naming"
		},
		{
			"source": "Quality",
			"target": "Security"
		},
		{
			"source": "Quality",
			"target": "Modularity"
		},
		{
			"source": "Quality",
			"target": "Accessibility"
		},
		{
			"source": "Quality",
			"target": "CI/CD"
		},
		{
			"source": "CI/CD",
			"target": "GitHub Actions"
		},
		{
			"source": "Quality",
			"target": "Intro to Refactoring"
		},
		{
			"source": "Intro to Refactoring",
			"target": "JavaScript Refactoring"
		},
		{
			"source": "Quality",
			"target": "Types"
		},
		{
			"source": "Types",
			"target": "TypeScript Simple Types"
		},
		{
			"source": "Big O",
			"target": "JavaScript Refactoring"
		},
		{
			"source": "Setup TypeScript",
			"target": "Configure TypeScript"
		},
		{
			"source": "TypeScript Simple Types",
			"target": "React TypeScript"
		},
		{
			"source": "TypeScript Simple Types",
			"target": "Progressive Typing"
		},
		{
			"source": "Progressive Typing",
			"target": "Progressive React Typing"
		},
		{
			"source": "Progressive Typing",
			"target": "TypeScript Jest"
		},
		{
			"source": "JavaScript Refactoring",
			"target": "Progressive Typing"
		},
		{
			"source": "Setup TypeScript",
			"target": "TypeScript Simple Types"
		},
		{
			"source": "Playwright Setup",
			"target": "Playwright Test"
		},
		{
			"source": "Testing Strategy",
			"target": "Quality Evaluation"
		},
		{
			"source": "Simple Jest Tests",
			"target": "Jest Spies"
		},
		{
			"source": "Jest Spies",
			"target": "Jest Mocks"
		},
		{
			"source": "Setup Jest",
			"target": "Configure Jest"
		},
		{
			"source": "Setup Jest",
			"target": "Jest Mocks"
		},
		{
			"source": "Jest Mocks",
			"target": "Jest Sockets"
		},
		{
			"source": "Jest Mocks",
			"target": "Jest Time"
		},
		{
			"source": "Jest Spies",
			"target": "MSW"
		},
		{
			"source": "Intro to Refactoring",
			"target": "React Performance Testing"
		},
		{
			"source": "Jest Spies",
			"target": "Jest React Components"
		},
		{
			"source": "Jest React Components",
			"target": "Jest Hooks"
		},
		{
			"source": "Playwright Scraping",
			"target": "Playwright Test"
		},
		{
			"source": "Playwright Setup",
			"target": "Configuring Playwright"
		},
		{
			"source": "Playwright Test",
			"target": "Storybook Tests"
		},
		{
			"source": "Playwright Test",
			"target": "Playwright Advanced Assertions"
		},
		{
			"source": "Playwright Scraping",
			"target": "Playwright Running Scripts"
		},
		{
			"source": "Playwright Advanced Testing",
			"target": "Accessibility Testing"
		},
		{
			"source": "AXE",
			"target": "Jest a11y Testing"
		},
		{
			"source": "AXE",
			"target": "Storybook a11y Testing"
		},
		{
			"source": "AXE",
			"target": "Playwright a11y Testing"
		},
		{
			"source": "Storybook a11y Testing",
			"target": "Accessibility Testing"
		},
		{
			"source": "Jest a11y Testing",
			"target": "Accessibility Testing"
		},
		{
			"source": "Storybook Setup",
			"target": "Configuring Storybook"
		},
		{
			"source": "Jest Spies",
			"target": "Storybook Tests"
		},
		{
			"source": "Storybook Setup",
			"target": "Storybook Tests"
		},
		{
			"source": "Storybook Stories",
			"target": "Storybook Docs"
		},
		{
			"source": "Documentation",
			"target": "Storybook Docs"
		},
		{
			"source": "Accessibility",
			"target": "Accessibility Testing"
		},
		{
			"source": "Playwright a11y Testing",
			"target": "Accessibility Testing"
		},
		{
			"source": "TypeScript Object Types",
			"target": "TypeScript Generic Types"
		},
		{
			"source": "TypeScript Simple Types",
			"target": "TypeScript Object Types"
		},
		{
			"source": "Simple Jest Tests",
			"target": "JavaScript Refactoring"
		},
		{
			"source": "Configure TypeScript",
			"target": "React TypeScript"
		},
		{
			"source": "Playwright Advanced Assertions",
			"target": "Playwright Advanced Testing"
		},
		{
			"source": "Configuring Playwright",
			"target": "Browser Performance Testing"
		},
		{
			"source": "Playwright Test",
			"target": "Browser Performance Testing"
		},
		{
			"source": "Quality",
			"target": "Documentation"
		},
		{
			"source": "Modularity",
			"target": "JavaScript Refactoring"
		},
		{
			"source": "Jest Spies",
			"target": "Storybook Stories"
		}
	]
}

export default data
