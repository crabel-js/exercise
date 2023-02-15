import { merge } from "lodash";

export const response = {
  schema: {
    type: "object",
    title: "Account",
    properties: {
      id: {
        type: "number",
      },
      code: {
        type: "string",
      },
      name: {
        type: "string",
      },
      state: {
        type: "number",
        enum: [
          "unknown",
          "Disabled / Closed",
          "Setting Up",
          "Pre Production",
          "Actively Trading",
          "Closing",
          "On Hold",
        ],
      },
      type: {
        type: "number",
        enum: ["undefined", "Managed Account", "Fund Account"],
      },
    },
  },
  value: {
    id: 1,
    code: "SPRSTRNGTH",
    name: "Kent Family Fund",
    state: 1,
    type: 3,
  }
};

export const JSONSchemaDecoratedIntoUISchema = merge({}, response.schema, {
  properties: {
    id: {
      readOnly: true
    }
  }
})