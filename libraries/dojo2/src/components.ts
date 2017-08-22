/**
 * @license
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v } from '@dojo/widget-core/d';
import 'ce-without-children';
import 'ce-with-children';
import 'ce-with-properties';
import 'ce-with-event';

export class ComponentWithoutChildren extends WidgetBase {
	render() {
		return v('div', [
			v('ce-without-children', {})
		]);
	}
}

export class ComponentWithChildren extends WidgetBase {
	render() {
		return v('div', [
			v('ce-with-children', {})
		]);
	}
}

export class ComponentWithChildrenRerender extends WidgetBase {
	private _count = 1;
	constructor () {
		super();
		Promise.resolve().then(() => {
			this._count++;
		});
	}
	render () {
		return v('div', [
			v('ce-with-children', [ `${this._count}` ])
		]);
	}
}

export class ComponentWithDifferentViews extends WidgetBase {
	private _showWC = true

	toggle() {
		this._showWC = !this._showWC;
		this.invalidate();
	}
	render () {
		const child = this._showWC ? v('ce-with-children', {}) : v('div', [ 'Dummy view' ]);
		return v('div', [ child ]);
	}
}

export class ComponentWithProperties extends WidgetBase {
	render () {
		const data = {
			bool: true,
			num: 42,
			str: 'React',
			arr: ['R', 'e', 'a', 'c', 't'],
			obj: { org: 'facebook', repo: 'react' }
		};
		return v('ce-with-properties', data);
	}
}

export class ComponentWithUnregistered extends WidgetBase {
	render () {
		const data = {
			bool: true,
			num: 42,
			str: 'React',
			arr: ['R', 'e', 'a', 'c', 't'],
			obj: { org: 'facebook', repo: 'react' }
		};
		return v('div', [
			v('ce-unregistered', data)
		]);
	}
}

export class ComponentWithImperativeEvent extends WidgetBase {
	private _eventHandled = false
	_handleEvent(e: any) {
		this._eventHandled = true;
		this.invalidate();
	}
	render() {
		return v('div', [
			v('div', [ this._eventHandled.toString() ]),
			v('ce-with-event', { id: 'wc', onCamelEvent: this._handleEvent })
		]);
	}
}

export class ComponentWithDeclarativeEvent extends WidgetBase {
	private _lowerCaseHandled = false;
	private _kebabHandled = false;
	private _camelHandled = false;
	private _capsHandled = false;
	private _pascalHandled = false;
	handleLowercaseEvent(e: any) {
		this._lowerCaseHandled = true;
	}
	handleKebabEvent(e: any) {
		this._kebabHandled = true;
	}
	handleCamelEvent(e: any) {
		this._camelHandled = true;
	}
	handleCapsEvent(e: any) {
		this._capsHandled = true;
	}
	handlePascalEvent(e: any) {
		this._pascalHandled = true;
	}
	render() {
		return v('div', [
			v('div', [ this._lowerCaseHandled.toString() ]),
			v('div', [ this._kebabHandled.toString() ]),
			v('div', [ this._capsHandled.toString() ]),
			v('div', [ this._pascalHandled.toString() ]),
			v('ce-with-event', {
				id: 'wc',
				onlowercaseevent: this.handleLowercaseEvent,
				'onkebab-event': this.handleKebabEvent,
				oncamelEvent: this.handleCamelEvent,
				onCAPSEvent: this.handleCapsEvent,
				onPascalEvent: this.handlePascalEvent
			})
		]);
	}
}
