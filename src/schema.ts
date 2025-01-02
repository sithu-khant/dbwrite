type FieldDefinition = {
  type: any;
  required?: boolean;
};

type SchemaOptions = {
  timestamps?: boolean;
};

export class Schema {
  fields: Record<string, FieldDefinition>;
  options: SchemaOptions;

  constructor(
    fields: Record<string, FieldDefinition>,
    options: SchemaOptions = {}
  ) {
    this.fields = fields;
    this.options = options;
  }
}
