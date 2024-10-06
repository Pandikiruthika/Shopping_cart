import React from 'react';
import PropTypes from 'prop-types';
import Label from '../SharedComponents/Label';

function InputBox(props) {
  return (
    <div className="inline-block w-full ">
      {props.label ? <Label required={props.required} label={props.label} /> : null}
      <input
        disabled={props.disabled}
        maxLength={props.maxLength}
        minLength={props.minLength}
        min={props.min}
        max={props.max}
        pattern={props.patternValue}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onKeyDown={props.onkeydown}
        autoComplete={props.autoComplete ?? 'off'}
        onWheel={(e) => e.target.blur()}
        key={props.key}
        checked={props.checked}
        name={props.name}
        defaultValue={props.defaultValue}
        onClick={props.onClick}
        onKeyUp={props.onKeyUp}
        accept={props.accept}
        className={`input-style ${props.className} ${props?.disabled ? 'bg-label-hover-color' : ''}`}
        id="input"
      />
      {props.radiolabel ? (
        <span className=" text-h1-text-color text-base m-1">{props.radiolabel}</span>
      ) : null}
    </div>
  );
}

InputBox.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  minLength: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  patternValue: PropTypes.string,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  key: PropTypes.string,
  checked: PropTypes.bool,
  name: PropTypes.string,
  defaultValue: PropTypes.any,
  onClick: PropTypes.func,
  onKeyUp: PropTypes.func,
  accept: PropTypes.string,
  className: PropTypes.string,
  radiolabel: PropTypes.string,
  onkeydown: PropTypes.func
};
export default InputBox;
