import React from 'react';
import {MdMoreVert, MdCreate, MdRemove, MdPlaylistAdd} from "react-icons/md"; 
import MarkdownIt from 'markdown-it';
export default class PreviewSection extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
      super(props);
      this.mdParser = new MarkdownIt();

      this.ps = React.createRef();
    }

    componentDidMount() {
      this.ps.current
      .addEventListener('click', (e)=>{
        if (e.target.nodeName === 'A') {
          e.preventDefault();
        }
      });

      var structure = new DOMParser().parseFromString(this.props.content, 'text/html');
      this.ps.current.innerHTML = structure.querySelector('body').innerHTML;
    }

    showEditor = (mode) => {
      this.props.showEditor(mode, this.props.pos)
    }

    removeSection = () => {
      this.props.showConfirmation({
        process: 'remove',
        pos: this.props.pos
      });
    }

    render() {
        return(
            <div className='preview-section'>
                <div ref={this.ps}>
                  
                </div>

                <div>
                  <div>
                    <ul>
                      <li>
                          <button>
                            <MdMoreVert />
                          </button>
                          <ul>
                              <li>
                                <button onClick={e => {this.showEditor('edit')}}>
                                  <MdCreate /> Edit
                                </button>
                              </li>
                              
                              <li>
                                <button onClick={this.removeSection}>
                                  <MdRemove /> Remove
                                </button>
                              </li>


                              {this.props.pos === 0 &&
                                <li>
                                <button onClick={e => {this.showEditor('addsa')}}>
                                    <MdPlaylistAdd /> Add section above
                                  </button>
                                </li>
                              }
                                                            
                              <li>
                                <button onClick={e => {this.showEditor('addsb')}}>
                                  <MdPlaylistAdd /> Add section below
                                </button>
                              </li>
                            
                          </ul>
                      </li>
                    </ul>
                  </div>
                </div>
                
            </div>
        )
    }
}