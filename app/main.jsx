import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ListView, ListViewHeader } from '@progress/kendo-react-listview';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';

import SClistViewItem from './SClistViewItem.jsx'
import SCwindow from './SCwindow.jsx'

import './kendo_default_all.css';

const articles = [ 
    {
        "Id": 0,
        "Title": "Pepita Pepperdale",
        "Subtitle": "98A",
        "Risk": "STEADY",
        "Image":"https://drive.google.com/uc?export=view&id=15_qDaQnd0J7XkgIzzCd_mqEjYXOKCaUT"
    },
    {
      "Id": 1,
        "Title": "Scott Tennyson",
        "Subtitle": "76C",
        "Risk": "RISKER",
        "Image":"https://drive.google.com/uc?export=view&id=1Um1HHzTqSNaB5W4KfNrI3UkFTzBZoC9K"
    },
    {
      "Id": 2,
        "Title": "Harrieta Stormsdale",
        "Subtitle": "72C",
        "Risk": "SAFER",
        "Image":"https://drive.google.com/uc?export=view&id=1V80_qV7gxRDs9KR7seTgCMSe-DagNvQ9"
    },
    {
      "Id": 3,
        "Title": "Iman Hosseini",
        "Subtitle": "75C",
        "Risk": "RISKER",
        "Image":"https://drive.google.com/uc?export=view&id=1Um1HHzTqSNaB5W4KfNrI3UkFTzBZoC9K"
    },
    {
      "Id": 4,
        "Title": "Ray Adici",
        "Subtitle": "99A",
        "Risk": "STEADY",
        "Image":"https://drive.google.com/uc?export=view&id=15_qDaQnd0J7XkgIzzCd_mqEjYXOKCaUT"
    },
    {
      "Id": 5,
        "Title": "Harold Nosleep",
        "Subtitle": "70C",
        "Risk": "SAFER",
        "Image":"https://drive.google.com/uc?export=view&id=1V80_qV7gxRDs9KR7seTgCMSe-DagNvQ9"
    },
    {
      "Id": 6,
        "Title": "Scott Smith",
        "Subtitle": "78C",
        "Risk": "RISKER",
        "Image":"https://drive.google.com/uc?export=view&id=1Um1HHzTqSNaB5W4KfNrI3UkFTzBZoC9K"
    },
    {
      "Id": 7,
        "Title": "Paul Pepe",
        "Subtitle": "96A",
        "Risk": "STEADY",
        "Image":"https://drive.google.com/uc?export=view&id=15_qDaQnd0J7XkgIzzCd_mqEjYXOKCaUT"
    },
]

const createLargeData = () => {
    const aryAdd = articles.map(a => Object.assign({}, a));    
    aryAdd.map((m) => {      
      m.Id = m.Id +8;      
      m.Title = m.Title + " - 2";
    });
    return [... articles, ... aryAdd];
}
const availableData = createLargeData();

const myHeader = () => {
    return (
      <ListViewHeader style={{ color: 'rgb(160, 160, 160)', fontSize: 14 }} className='pl-4 pb-2 pt-2'>
        COMPARING BY PEOPLE
      </ListViewHeader>
    );
}

const DialogTitleBar = () => {
    return (
          <div className="k-dialog-titlebar k-header" >
            <span>{this.props.Title}</span>
          </div>
    );
}


class App extends React.Component {
    state = {
        //skip: 0,
        //take: 3,
        data: availableData, //availableData.splice(0, 12),        
        showingDataItem: null,
        showingDataItems: []
    };

    handlePageChange = (e) => {
        this.setState({
            skip: e.skip,
            take: e.take
        });
    }

    scrollHandler = (event) => {
        console.log("Scrolling...");
        const e = event.nativeEvent;
        console.log((e.target.scrollTop + 10) + " >= " + (e.target.scrollHeight - e.target.clientHeight));
        if (e.target.scrollTop + 10 >= e.target.scrollHeight - e.target.clientHeight) {
            const moreData = availableData.splice(0, 6);
            if (moreData.length > 0) {
                this.setState({ data: this.state.data.concat(moreData) });
            }
        }
    }

    setShowingItem = (item) =>{
      console.log("Opening Id: " + item.Id); 
        let newShowingDataItems = [... this.state.showingDataItems];
        newShowingDataItems.push(item);
        newShowingDataItems = [...new Set(newShowingDataItems)];
        
        this.setState({            
            showingDataItem: item,
            showingDataItems: newShowingDataItems
        });

        //console.log("setShowingItem this.state.showingDataItems: "+JSON.stringify(newShowingDataItems));
    }
    
    toggleDialog = () => {      
        this.setState({
            showingDataItem: null
        });
    }

    windowClosed = (id) => {
      console.log("Closing Id: " + id);      

      let newShowingDataItems = [];
      this.state.showingDataItems.map((ele) => { if(ele.Id != id) newShowingDataItems.push(ele); });
      this.setState({
          showingDataItem: null,
          showingDataItems: newShowingDataItems
      });

      //console.log("windowClosed this.state.showingDataItems: "+JSON.stringify(newShowingDataItems));
    }

    render() {
        //const { skip, take } = this.state;
        const { showingDataItem, showingDataItems } = this.state;

        const MyCustomItem = props => <SClistViewItem {...props} setShowingItem={this.setShowingItem}  />;

        return (
          // <div>
          //   <ListView
          //     data={articles.slice(skip, skip + take)}
          //     item={MyItemRender}
          //     style={{ width: "100%" }}
          //     header={myHeader}
          //       />
          //   <Pager skip={skip} take={take} onPageChange={this.handlePageChange} total={articles.length} />
          // </div>
          <div>
            <ListView
              //onScroll={this.scrollHandler}
              data={this.state.data}
              item={MyCustomItem}
              style={{ width: "100%", height: 550 }}
              header={myHeader}            
              />    

            {/* {showingDataItem && <Dialog title={<DialogTitleBar Title={showingDataItem.Title} />} onClose={this.toggleDialog} width={300} height={400}>
                <p>{showingDataItem.Subtitle}</p>
                <DialogActionsBar>
                <button className="k-button k-flat k-primary" onClick={this.toggleDialog}>Close</button>
              </DialogActionsBar>
                
              </Dialog>} */}

              {                
                showingDataItems.map((m, i) => {
                    return <SCwindow id={m.Id} Item={m} onClose={this.windowClosed} />
                })
              }
          </div>
        );
    }
}

ReactDOM.render(
  <React.Fragment>
    <App />
    <style>
      {/* {`.k-card:last-of-type  {
            border: none !important;
        }
        .k-pager-wrap {
            border-top: none;
        }`} */}
         {`.k-listview-content {
            display: flex;
            flex-wrap: wrap;
        }`}
    </style>
  </React.Fragment>, document.querySelector('my-app')
);
