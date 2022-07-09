# Team Task Manager Application

## Introduction

For now - app only **fully optimized** for Chrome and Firefox browsers, some small visual problems may occur in Safari or Internet Explorer!

### Functionality

* All **CRUD** operations are implemented for users and tasks + ability to mark task as completed
* First **10 users** and **20 tasks** for each of them are fetched from [json.placeholder](https://jsonplaceholder.typicode.com/ "json.placeholder")
* All data is stored in the **localStorage** so it won't be lost on every page refresh
* Small **pop-ups** (e.g. when deleting, creating or completing a task) for interactivity
* Sorting
  * You can sort users and task by choosing options in selector 
  * You can input string and search it in the user name or task title, overlaps will be highlightened
* Smooth animations and transitions
* Minor handy features like closing the modals with *"Escape"* button and saving changes by pressing *"Enter"*
* Common errors are handled so nothing will break

For more information you can open this app on GitHub Pages [here](https://kr4chinin.github.io/team-task-manager/ "here") and go to **information page** in the navigation bar.

This app allows you to create team members, give them various tasks and track each member efficiency. 

<img width="1423" alt="app preview" src="https://user-images.githubusercontent.com/103210607/178024150-0fe83b55-59f9-4b79-aaef-d9bcce902fcf.png">

**Click** on user/task to open modal window with various operations:

<img width="800" alt="user modal" src="https://user-images.githubusercontent.com/103210607/178028582-dd4a1c01-ee7f-4683-ae3c-255b02b32fe3.png">

Application has simple, friendly UI and lots of sorting options so working with large amount of users and tasks will be much easier.

<img width="1423" alt="image" src="https://user-images.githubusercontent.com/103210607/178025042-d3ee6433-e333-4121-ab89-9dfdc06426db.png">

When user has created, deleted or completed a task a small pop-up will be shown at the bottom of the screen:

<img width="337" alt="image" src="https://user-images.githubusercontent.com/103210607/178029792-fbfa0b45-ed67-4d14-bfb3-8146ab1d206d.png">

## Tech stack

* Typescript + React
* CSSTransitionGroup for transitions
* Plain CSS with no preprocessors
