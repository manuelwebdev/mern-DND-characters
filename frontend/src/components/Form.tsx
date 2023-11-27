type Props = {
  title: string
}

export default function Form({ title }: Props) {
  const testForm = {
    inputs: [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Name',
      },
      {
        name: 'class',
        label: 'Class',
        type: 'text',
        placeholder: 'Class',
      },
      {
        name: 'level',
        label: 'Level',
        type: 'text',
        placeholder: 'Level',
      },
      {
        name: 'race',
        label: 'Race',
        type: 'text',
        placeholder: 'Race',
      },
      {
        name: 'background',
        label: 'Background',
        type: 'text',
        placeholder: 'Background',
      },
      {
        name: 'alignment',
        label: 'Alignment',
        type: 'text',
        placeholder: 'Alignment',
      },
    ],
  }
  return (
    <div>
      <h2>{}</h2>
      {testForm.inputs.map((input) => (
        <div key={input.name}>
          <label htmlFor={input.name}>{input.label}</label>
          <input
            type={input.type}
            name={input.name}
            placeholder={input.placeholder}
          />
        </div>
      ))}
      <input type='submit' value='Submit' />
    </div>
  )
}
