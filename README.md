# Crabel Frontend Exercise

👋 Hello, we hope you are just as excited to be a part of this as we are!

Bringing someone aboard is a great honor and we are thrilled that you are open to showcase your talent for us.

The purpose of this exercise is to..

- Respect your time by limiting the scope of the exercise
- Get you up to speed on the frontend toolset we use at Crabel so that you're more equiped on your first day
- Allow you to convey your programming expertise

## What we would like you to do

- [ ] Clone this github repo
- [ ] Setup a React and Typescript app using Vite... ([guide](https://vitejs.dev/guide/#scaffolding-your-first-vite-project))
- [ ] Install the dependencies

```
npm install lodash
npm install flexlayout-react
npm install @ui-schema/ui-schema immutable @ui-schema/ds-material
npm install @mui/material @mui/icons-material
```

- [ ] Create a dashboard layout in Flexbox-React with a single TabNode
- [ ] In that TabNode, generate a form using **Bemit UI Schema** using the data found in `data/data.js`. The UISchemaPanel for now only has to focus on this one data source, no need to abstract that out, you can hardcode the `import` to `data/data.js`.
- [ ] By default, all fields should be `readOnly: true`. To do this you can add a UI Schema plugin that looks for `isEditing` on the parent's schema, and then applies `readOnly` to all of the properties of that object.

```
const EditMode = () => ({
    should: () => true,
    handle: ({ errors, valid, parentSchema, schema }: any) => {
        let newSchema = schema;

        if (parentSchema) {
            let isEditing = parentSchema.get("isEditing");

            if (isEditing) {
                if (newSchema.get("items")) {
                    newSchema = newSchema.setIn(["items", "readOnly"], true);
                } else {
                    newSchema = newSchema.set("readOnly", true);
                }
            }
        }

        return { errors, valid, schema: newSchema };
    },
});

export const uiSchemaWidgetFactory: () => CustomWidgetsBinding = () => {
    return {
        ...widgets,
        pluginSimpleStack: [...widgets.pluginSimpleStack, EditMode()],
    };
};
```

and then in your `UiSchemaDashboardPanel` you can apply `isEditing` to the parent schema depending on if the `panelState` is `edit` or `home`.

```

const [panelState, setPanelState] = useState('home')

// ...

const isEditing = panelState === "edit";

const schema = useMemo(() => {
        if ((schemaFromFile as any).items) {
            (schemaFromFile as any).items.isEditing = isEditing;
            return createOrderedMap(schemaFromFile!.items as JsonSchemaObject);
        }

        if ((schemaFromFile as any).properties) {
            (schemaFromFile as any).isEditing = isEditing;
            const map = createOrderedMap(schemaFromFile);
            return map;
        }

    return createOrderedMap({});
}, [schemaFromFile, isEditing]);

// then pass schema to the UiSchema component
```

- [ ] Make sure the ID field is `readOnly` even in edit mode.
- [ ] In edit mode, the button area should have two buttons **Update** and **Cancel**... Both buttons will return the `panelState` back to `home` mode, **Update** will set value to the dirty state, **Cancel** will return the data of the form back to the cleanState and will ignore any changes to the data in the form the user has made.

## Our ideals

As we look over your submission, our developers want to make sure that you..

- Memoize your functions properly using React Hooks
- Create Typescript types for any configuration you write
- Hardcode as little information as possible. We would like everything to be configured as part of the Layout JSON and UI Schema.

For example, You can create a finite-state machine (FSM) for the panelState for the **home** and **edit** states and store the FSM in the `config` object the pane. Both the **home** and **edit** node in the FSM can have a `config` object that contains an array of buttons to render. You can then write a ButtonFactory that holds a switch statement to render the buttons.

## Submitting your code to Crabel

Create a .zip file of your project without the `node_modules` and email it to your contact at Crabel. On the CoderByte assessment page (the one that linked you to this repo), please respond with who you emailed your .zip file to and ignore the input for a github repo link.

## Crabel Tech Stack

Used in this exercise...

- Vite
- React
- FlexLayout-React (aka GoldenLayout, but for React)
- Bemit UI Schema
- React Memoization Hooks

Not used, but we will chat about these in your technical interview...

- Web Workers
- Websockets
- HighCharts / HighCharts Stock
- AG Grid
- Localstorage
- Lz String compression
- Finite State Machines (FSMs)
- JSON Decoration and Transformation
- Singleton, Facade, Factory Pattern
- RxJS, Observables, React Context

## Concepts

In order for you to be more prepared for working at Crabel, here is some additional information that does not directly apply to this exercise.

### Metaprogramming

We use [metaprogramming](https://en.wikipedia.org/wiki/Metaprogramming) in order to store the complete functionality of an app as data/JSON.

This allows our layouts and the UI contained in the layout's panels to be generated and updated on the fly by anyone at the firm even if they don't write code. See the video on [Retool](https://retool.com/)'s homepage for more inspiration.

### Dashboarding

Dashboards allow people at the firm to compose and share layouts between each other and across teams. We feel it gives people an advantage to resize and rearrange their dashboards however they see it.

### Data Visualization

Our UI's can be boiled down to an interface for CRUD Operations

- Create
  - Create new items via a form
  - Add new list items to a list via a table
  - Requesting Websockets to push updates for lists to all connected clients when we add list items
- Read
  - Display lists as a Chart or Graph
  - Display lists as Table of data
  - Display list items as form
- Update
  - Edit mode for list items in form view
  - Requesting Websockets to push updates to all connected clients when we update data
  - Responding to Websockets when a list or list item is updating by someone else while we are viewing it
- Delete
  - Requesting Websockets to push updates for lists to all connected clients when we delete list items
