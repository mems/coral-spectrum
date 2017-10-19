/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2017 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 */

import Component from 'coralui-mixin-component';
import {transform, validate} from 'coralui-util';

/**
 Enum for wait variant values.
 @enum {String}
 @memberof Coral.Wait
 */
const variant = {
  /** The default variant. */
  DEFAULT: 'default',
  /** A dot styled wait. */
  DOTS: 'dots'
};

/**
 Enumeration representing wait indicator sizes.
 @memberof Coral.Wait
 @enum {String}
 */
const size = {
  /** A small wait indicator. This is the default size. */
  SMALL: 'S',
  /** A medium wait indicator. */
  MEDIUM: 'M',
  /** A large wait indicator. */
  LARGE: 'L'
};

// the waits's base classname
const CLASSNAME = 'coral3-Wait';

// builds a string containing all possible variant classnames. this will be used to remove classnames when the variant
// changes
const ALL_VARIANT_CLASSES = [];
for (const variantValue in variant) {
  ALL_VARIANT_CLASSES.push(`${CLASSNAME}--${variant[variantValue]}`);
}


/**
 @class Coral.Wait
 @classdesc A Wait component
 @htmltag coral-wait
 @extends HTMLElement
 @extends Coral.mixin.component
 */
class Wait extends Component(HTMLElement) {
  /**
   The size of the wait indicator. Currently 'S' (the default), 'M' and 'L' are available.
   See {@link Coral.Wait.size}
   @type {Coral.Wait.size}
   @default Coral.Wait.size.SMALL
   @htmlattribute size
   @htmlattributereflected
   @memberof Coral.Wait#
   */
  get size() {
    return this._size || size.SMALL;
  }
  set size(value) {
    value = transform.string(value).toUpperCase();
    this._size = validate.enumeration(size)(value) && value || size.SMALL;
    this._reflectAttribute('size', this._size);

    // large css change
    this.classList.toggle(`${CLASSNAME}--large`, this._size === size.LARGE);

    // medium css change
    this.classList.toggle(`${CLASSNAME}--medium`, this._size === size.MEDIUM);
  }
  
  /**
   Whether the component is centered or not. The container needs to have the style <code>position: relative</code>
   for the centering to work correctly.
   @type {Boolean}
   @default false
   @htmlattribute centered
   @htmlattributereflected
   @memberof Coral.Wait#
   */
  get centered() {
    return this._centered || false;
  }
  set centered(value) {
    this._centered = transform.booleanAttr(value);
    this._reflectAttribute('centered', this._centered);
    
    this.classList.toggle(`${CLASSNAME}--centered`, this._centered);
  }
  
  /**
   The wait's variant.
   @type {Coral.Wait.variant}
   @default Coral.Wait.variant.DEFAULT
   @htmlattribute variant
   @htmlattributereflected
   @memberof Coral.Wait#
   */
  get variant() {
    return this._variant || variant.DEFAULT;
  }
  set variant(value) {
    value = transform.string(value).toLowerCase();
    this._variant = validate.enumeration(variant)(value) && value || variant.DEFAULT;
    this._reflectAttribute('variant', this._variant);

    // removes every existing variant
    this.classList.remove(...ALL_VARIANT_CLASSES);

    if (this._variant !== variant.DEFAULT) {
      this.classList.add(`${CLASSNAME}--${this._variant}`);
    }
  }
  
  // expose enumerations
  static get size() { return size; }
  static get variant() { return variant; }
  
  static get observedAttributes() {
    return ['size', 'centered', 'variant'];
  }
  
  connectedCallback() {
    super.connectedCallback();
  
    // Default reflected attributes
    if (!this._size) { this.size = size.SMALL; }
    if (!this._variant) { this.variant = variant.DEFAULT; }
    
    this.classList.add(CLASSNAME);
  }
}

export default Wait;