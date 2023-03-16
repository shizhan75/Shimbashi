const DEFAULT_INPUT_WIDTH = 8; // 9 of 12

const List = (...items) => items.join('');

const Row = (...columns) => `
  <div class="row">
   ${columns.join('')}
  </div>
`;

const Column = ({width, items}) => {
  items = items || [];
  return `
    <div class="col-${width}">
      ${items.join('')}
    </div>
  `;
};

const InputText = ({name, width}) => {
  width = width || DEFAULT_INPUT_WIDTH;
  return `
    <div class="row">
      <label for="${name}-id" class="col-sm-${12 - width} col-form-label">${name}</label>
      <div class="col-sm-${width}">
        <input class="form-control" id="${name}-id" name="${name}">
      </div>
    </div>
  `;
};

const InputNumber = ({name, width}) => {
  width = width || DEFAULT_INPUT_WIDTH;
  return `
    <div class="row">
      <label for="${name}-id" class="col-sm-${12 - width} col-form-label">${name}</label>
      <div class="col-sm-${width}">
        <input class="form-control" id="${name}-id" type="number" name="${name}">
      </div>
    </div>
  `;
};

const InputRadioGroup = ({name, width, options}) => {
  width = width || DEFAULT_INPUT_WIDTH;
  return `
    <fieldset class="row">
      <legend class="col-form-label col-sm-${12 - width} pt-0">${name}</legend>
      <div class="col-sm-${width}">
        ${options.map(option => (`
          <div class="form-check">
            <input class="form-check-input" type="radio" name="${name}" id="${option}-radio-id" value="${option}" ${false ? 'checked' : ''}>
            <label class="form-check-label" for="${option}-radio-id">
              ${option}
            </label>
          </div>
        `)).join('')}
      </div>
    </fieldset>
  `;
};

const InputCheckbox = ({name, width}) => {
  width = width || DEFAULT_INPUT_WIDTH;
  return `
    <div class="row">
      <div class="col-sm-${width} offset-sm-${12 - width}">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="${name}-checkbox-id" name="${name}">
          <label class="form-check-label" for="${name}-checkbox-id">
            ${name}
          </label>
        </div>
      </div>
    </div>
  `;
};

$(() => {
  $('#input-container').append(
    Row(
      Column({
        width: 6,
        items: [
          InputText({
            name: 'Exe path',
          }),
          InputText({
            name: 'Polynomial',
          }),
          InputNumber({
            name: 'Constant',
          }),
          InputRadioGroup({
            name: 'Render Options',
            options: [
              '1 step',
              '1000 steps',
              'infinity steps',
              'variable steps',
            ]
          }),
          Row(
            Column({
              width: 4,
            }),
            Column({
              width: 8,
              items: [
                InputNumber({
                  name: 'step =',
                }),
              ],
            }),
          ),
          InputRadioGroup({
            name: '-no label-',
            options: [
              'Random',
              'BFS',
              'GBF',
            ]
          }),
          InputCheckbox({
            name: 'Hide Box Boundaries',
          }),
        ],
      }),
      Column({
        width: 1,
      }),
      Column({
        width: 5,
        items: [
          InputNumber({
            name: 'Radius',
          }),
          InputNumber({
            name: 'Epsilon',
          }),
          InputNumber({
            name: 'alpha.x',
          }),
          InputNumber({
            name: 'alpha.y',
          }),
          InputNumber({
            name: 'beta.x',
          }),
          InputNumber({
            name: 'beta.y',
          }),
          InputNumber({
            name: 'seed',
          }),
        ],
      }),
    )
  );

  $('#submit-button').on('click', (e) => {
    e.preventDefault();
    const formArray = $('form').serializeArray();
    const formData = {};
    formArray.forEach(({name, value}) => {
      formData[name] = value;
    });
    $.ajax({
      type: 'POST',
      url: `/submit`,
      data: JSON.stringify(formData),
      contentType : 'application/json',
    });
    console.info(formData);
  })
});