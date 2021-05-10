import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ListView, ListViewHeader } from '@progress/kendo-react-listview';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { FloatingActionButton } from '@progress/kendo-react-buttons';

import SClistViewItem from './SClistViewItem.jsx'
import SCwindow from './SCwindow.jsx'

import './kendo_default_all.css';

const KENDO_WIN_WIDTH = 350;

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
    
    constructor(props) {
        super(props);

        this.state = {
          //skip: 0,
          //take: 3,
          data: availableData, //availableData.splice(0, 12),        
          //openDataItem: null,
          openDataItems: [],
          openWinPositions: [{}]
        }

        this.openWindows = [];
    }

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

    setOpenItems = (item) =>{
      console.log("Opening Id: " + item.Id); 
        let newOpenDataItems = [... this.state.openDataItems];
        newOpenDataItems.push(item);
        newOpenDataItems = [...new Set(newOpenDataItems)];
        
        this.setState({            
            //openDataItem: item,
            openDataItems: newOpenDataItems
        });

        //console.log("setOpenItems this.state.openDataItems: "+JSON.stringify(newOpenDataItems));
    }
    
    toggleDialog = () => {      
        this.setState({
            openDataItem: null
        });
    }

    windowClosed = (id, winRef) => {
      console.log("Closing Id: " + id);
      console.log("Closing Win Id: " + (winRef ? winRef.props.id : " is null"));

      let newOpenDataItems = [];      
      this.state.openDataItems.map((ele) => { if(ele.Id != id) newOpenDataItems.push(ele); });

      let newOpenWindows = [];
      this.openWindows.map((w) => { if(w.Id != id) newOpenWindows.push(w); });
      this.openWindows = newOpenWindows;

      this.setState({
          //openDataItem: null,
          openDataItems: newOpenDataItems,          
      });

      //console.log("windowClosed this.state.openDataItems: "+JSON.stringify(newOpenDataItems));
    }

    windowOpened = (win) =>{
      this.openWindows.push(win);
    }

    closeAllWins = () =>{
      this.openWindows = [];
      this.setState({
          openDataItems: []          
      });
    }

    rearrangeWins = () => {
       //var curLeft = 0;
      // this.openWindows.forEach((win) => {
      //   console.log("top: " + win.top);

      //   win.top = 0;
      //   win.left = curLeft;
      //   win.width = KENDO_WIN_WIDTH;
      //   win.height = window.innerHeight;
      //   curLeft += KENDO_WIN_WIDTH;
      // });

      let curLeft = 1;
      let newOpenWinPositions = [];
      this.state.openDataItems.map((ele) => { 
        newOpenWinPositions.push({
            top: 1,
            left: curLeft,            
        });
        curLeft += KENDO_WIN_WIDTH;
        if(curLeft > window.innerWidth)
          curLeft = 0;
      });

      this.setState({
          openWinPositions: newOpenWinPositions          
      });
    }

    render() {
        //const { skip, take } = this.state;
        const { openDataItem, openDataItems, openWinPositions } = this.state;

        const MyCustomItem = props => <SClistViewItem {...props} setOpenItems={this.setOpenItems}  />;

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

            {/* {openDataItem && <Dialog title={<DialogTitleBar Title={openDataItem.Title} />} onClose={this.toggleDialog} width={300} height={400}>
                <p>{openDataItem.Subtitle}</p>
                <DialogActionsBar>
                <button className="k-button k-flat k-primary" onClick={this.toggleDialog}>Close</button>
              </DialogActionsBar>
                
              </Dialog>} */}

            {                
              openDataItems.map((m, i) => {
                  return <SCwindow key={''+m.Id} position={(openWinPositions && openWinPositions[i]) ? openWinPositions[i] : {} } initialWidth={KENDO_WIN_WIDTH} Item={m} onClose={this.windowClosed} onOpen={this.windowOpened} />
              })
            }
            {
              openDataItems && openDataItems.length > 0 && 
              <FloatingActionButton align={{ vertical: 'bottom', horizontal: 'end' }} icon={'plus'} 
	              items={[{ icon: 'plus', text: 'Rearrange' }, { icon: 'trash', text: 'Close All'}]} 
                onItemClick={(e) => {
                  if(e){                    
                    if(e.itemProps.text === 'Rearrange'){
                      this.rearrangeWins();
                    }
                    else if(e.itemProps.text === 'Close All'){
                      this.closeAllWins();
                    }
                  }
                }} />
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
