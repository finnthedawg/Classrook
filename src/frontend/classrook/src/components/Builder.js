// Inspired by React Component builder as described in the following article https://medium.com/@jagardner2113/react-component-builder-pattern-5cb864ce5fc0 
import { Component } from 'react';

export const Builder = (displayName = 'Component') => {
    let _render, _componentDidMount

    const builder = {
        render: renderFn => {
            _render = renderFn
            return builder
        },
        componentDidMount: didMountFn => {
            _componentDidMount = didMountFn
            return builder
        },
        // mapStyles: styles => {
        //     _styles = styles
        //     return builder
        // },
        build: () => {
            if (!_render) {
                throw new Error('Component render method required')
            }
            let Comp;
            Comp = class extends Component {
                render() {
                    return _render(this.props)
                }
                componentDidMount() {
                    if (_componentDidMount) _componentDidMount(this.props)
                }
            }

            Comp.displayName = displayName
            return Comp
        },
    }

    return builder
}
