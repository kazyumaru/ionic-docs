import { h } from '@stencil/core';
import { toHypertext } from '../to-hypertext';

export default (props) => {
  const { page } = props;
  const headings = [...page.headings];
  const examples = renderExamples(page.exampleCommands);
  const inputs = renderInputs(page.inputs);
  const options = renderOptions(page.options);
  const advancedOptions = renderAdvancedOptions(page.options);

  if (examples) {
    headings.push({
      text: '例',
      href: '#examples',
    });
  }

  if (inputs) {
    headings.push({
      text: '入力データ',
      href: '#inputs',
    });
  }

  if (options) {
    headings.push({
      text: 'オプション',
      href: '#options',
    });
  }

  if (advancedOptions) {
    headings.push({
      text: '詳細オプション',
      href: '#advanced-options',
    });
  }

  return (
    <article>
      <h1>{ page.title }</h1>
      <docs-table-of-contents links={headings} basepath={page.path} />
      <section class="summary intro">
        {toHypertext(h, page.summary)}
      </section>
      { renderUsage(page) }
      <section class="description">
        {toHypertext(h, page.body)}
      </section>
      { examples }
      { inputs }
      { options }
      { advancedOptions }
    </article>
  );
};

const renderUsage = command => {
  return (
    <command-line>
      <command-prompt>
        { command.title }
        { command.inputs.length > 0 ?
          ` ${command.inputs.map(input => input.required ? `<${input.name}>` : `[<${input.name}>]`).join(' ')} ` :
          ' ' }
        [options]
      </command-prompt>
    </command-line>
  );
};

const renderInputs = (inputs = []) => {
  if (inputs.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 id="inputs">
        <a href="#inputs">入力データ</a>
      </h2>
      <docs-reference
        data={inputs}
        keys={{
          Head: input => input.name,
          Description: input => <div innerHTML={input.summary} />,
        }} />
    </section>
  );
};

const renderOptions = (options = []) => {
  options = options.filter(option => !option.groups.includes('advanced'));

  if (options.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 id="options">
        <a href="#options">オプション</a>
      </h2>
      { renderOptionList(options) }
    </section>
  );
};

const renderAdvancedOptions = (options = []) => {
  options = options.filter(option => option.groups.includes('advanced'));

  if (options.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 id="advanced-options">
        <a href="#advanced-options">詳細オプション</a>
      </h2>
      { renderOptionList(options) }
    </section>
  );
};

const renderOptionList = (options = []) => {
  return (
    <docs-reference
      data={options}
      keys={{
        Head: option => renderOptionSpec(option),
        Description: option => <div innerHTML={option.summary} />,
        Aliases: option => option.aliases.length > 0 ? option.aliases.map(alias => <code>-{alias}</code>) : null,
        Default: option => option.default && option.type === 'string' ? option.default : null
      }} />
  );
};

const renderOptionSpec = option => {
  return (
    <a href={`#option-${option.name}`} id={`option-${option.name}`}>
      --{ option.type === 'boolean' && option.default === true ? `no-${option.name}` : option.name }
      { option.type === 'string' ?
        <span class="option-spec">
          { `=<${option.spec.value}>` }
        </span> :
        null }
    </a>
  );
};

const renderExamples = (examples = []) => {
  if (examples.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 id="examples">
        <a href="#examples">例</a>
      </h2>
      <command-line nobuttons>
      { examples.map(command => (
        <command-prompt>{command}</command-prompt>)
      )}
      </command-line>
    </section>
  );
};
