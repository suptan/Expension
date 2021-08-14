# Description

## Overview

I found this project is quite a challenge to my skills since I usually working with React, so I have to improvise the knowledge from React to Vue which especially compound component which help me during implement reuseable components, other technologies as Composition API which I have no idea what it is and after this assignment, I think it's just a top of iceberg of what I have understand so far eg. the area which I didn't reach out is how to working with `composables`.

> Noted: according to the requirements of as a user, I can distinguish `Cash in` records by blue color & `+` sign; `Cash out` records by green color & `-` sign, are mismatched from the design which I decide to stick with the given design.

## Technologies

- Nuxt + capi
- Ant Design: CSS Framework to help reduce workload on implement every components especially `<Form>`
- Vuex: Application state management
- Styled Component: Ensure unique styles for each element
- Linter: Control project coding standard
  - ESLint
  - StyleLint
  - Prettier

## Approach

### Requirement analysis

This was the first step which I took when begin this assignment. I had look through [Specification.md](/Specification.md) and try to coming up with implementation strategy as follow

1. Setup project
2. Categories page
3. Expense page
4. Add/Edit expense page
5. QA

Each step will also help me to learn this technologies step by step too.

### Setup Project

According to spec, the technologies that available to be choose are either Vue3 or Nuxt which I never have experience on both of them, so I coming up with my own mapping system between React and Vue to help me make a decision.

Finally I choose Nuxt because it's Vue framework which had been handle low level setups for me and it's help me to skip some setup steps eg. TypeScript, CSS framework, Vuex. The downside is Nuxt isn't fully support with Vue3 (as of 9 Aug 2021) but there is a module which is and extend that make composition API available for Nuxt, also I weren't able to use latest version of Ant Design which compatible with composition API because Nuxt doesn't has Vue3 build in so I have to use optional API for control form. After follow setup step from Nuxt cli the app is able to start with `npm run dev` and ready to serve on [localhost:3000](http://localhost:3000)

### Categories page

This is the first requirement (and first page) which I choose for implementation because

- Data schema for this page is simple
- UI is not complicate (list item and form)

The most frustration for this implementation step is go for Vuex because most of the example on the internet is go with JavaScript and single module but what I try to achieve is it should have type for each function especially for action & mutation and use sub-module to avoid naming duplication.

This part was consume 80% of my development time to make it's work with a lot of boilerplate for type declaration. The strategy that I took for this are

- Setup Styled component
- Setup Vuex
- Page implementation and connect to store
  - Look and feel with mock data
  - Connect to store
  - Edit categories
  - Drag and Drop
- Refactor to capi

The reason that I didn't start with capi because most example that I found for Vuex is class-based approach so I decide to build store which useable logic first to help me understand how it's work then refactor to capi later to help me identify problems easier.

Beside from implementation guide for Vuex Typescript + sub-module is hard to find on the internet, next thing will be Ant Design Form even the official doc is written well but barely mention to how to working with Vuex.

For DnD (drag & drop), I decide not to use any lib which contain fancy animation and build-in feature because I would like to show my own implementation skill on how I will implement this.

### Expense page

Next implementation will be Expense page, which is more simpler than Categories page because it's repeated from whatever I had been done on the previous page.

This is the first time which I invoke with page navigation and app layout which Nuxt also have a build-in feature.

### Add/Edit expense page

The final page, this time I will have to work on more complex form because its contain variant data types such as string, date, list items.
One thing that I find here is Ant Design is force developers to use `moment` for date picker otherwise we can't manipulate this input data.

I start with add form so I just need to deal with form creation and add operation for store which I found out later that my store is contain key collision even I separate my modules and I have to create other enums which support actions with namespaced.

For edit mode, I just found out how painful to deal with reactive data because I have to get id from url → then find matching in store → after that binding to form.

### QA

For this step I plan to re-test all the features again before deliver with the following scenario

#### Happy Cases

- User is able to create new category item
- User is able to update existing category items except 'Food', 'Transportation', 'Entertainment', 'Work'
- User is able to reorder all category items
- Click 'Expense' at footer then redirect to monthly report page w/ selection at 'Expense'
- Click 'Category' at footer then redirect to category page w/ selection at 'Category'
- Expense Tracking Page should display as monthly report
  - When net value is positive should display `+` sign and green color
  - When net value is negative should display `-` sign and blue color
  - Monthly total always use blue color
  - Always display currency symbol
  - Report should be display in `asc` order
- Go to `Edit Expense Page` by clicking on any expense record
- Go to `Add Expense Page` by clicking on `add` button in top right
- User is able to create new expense record with input data and display in monthly report
- User is able to edit existing expense record
- User is able to discard change when edit expense record
- User is able to remove expense record

#### Edge Cases

- When click add w/ empty name, should display error message
- When user click cancel button after change category, the name shouldn't be updated
- When user updated category name and immediately click the same row again, form should be updated with latest name
- Should trim category name
- Expense Page should display `No Record` when no record
- All fields should be required for `add` expense record (except `description`)
- Remove button shouldn't appear when add new record

## Things to be improve

- Assign type to store action from cross modules
- Enum of Action types with sub module
- Logger
- Testing
- Page meta
- Monthly report caching
- Upgrade CSS framework (antd) when Nuxt fully support Vue 3
- Reduce size of Ant Design from bundle
- Randomly error message from layout components
