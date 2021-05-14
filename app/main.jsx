import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ListView, ListViewHeader } from '@progress/kendo-react-listview';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { FloatingActionButton, Button, ButtonGroup } from '@progress/kendo-react-buttons';
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import { filterBy } from "@progress/kendo-data-query";

import SClistViewItem from './SClistViewItem.jsx'
import SCwindow from './SCwindow.jsx'

import './kendo_default_all.css';

const KENDO_WIN_WIDTH = 360;

const companyData = [ 
    {
        "Id": 0,
        "Devision": "01",
        "Title": "COMPANY RESULT",
        "Subtitle": "98A",
        "Risk": "STEADY",
        "Image":"https://drive.google.com/uc?export=view&id=15_qDaQnd0J7XkgIzzCd_mqEjYXOKCaUT"
    }
]
const articles = [ 
    {
        "Id": 0,
        "Devision": "02",
        "Title": "Pepita Pepperdale",
        "Subtitle": "98A",
        "Risk": "STEADY",
        "Image":"https://drive.google.com/uc?export=view&id=15_qDaQnd0J7XkgIzzCd_mqEjYXOKCaUT"
    },
    {
      "Id": 1,
      "Devision": "03",
      "Title": "Scott Tennyson",
      "Subtitle": "76C",
      "Risk": "RISKER",
      "Image":"https://drive.google.com/uc?export=view&id=1Um1HHzTqSNaB5W4KfNrI3UkFTzBZoC9K"
    },
    {
      "Id": 2,
      "Devision": "04",
      "Title": "Harrieta Stormsdale",
      "Subtitle": "72C",
      "Risk": "SAFER",
      "Image":"https://drive.google.com/uc?export=view&id=1V80_qV7gxRDs9KR7seTgCMSe-DagNvQ9"
    },
    {
      "Id": 3,
      "Devision": "05",
      "Title": "Iman Hosseini",
      "Subtitle": "75C",
      "Risk": "RISKER",
      "Image":"https://drive.google.com/uc?export=view&id=1Um1HHzTqSNaB5W4KfNrI3UkFTzBZoC9K"
    },
    {
      "Id": 4,
      "Devision": "06",
      "Title": "Ray Adici",
      "Subtitle": "99A",
      "Risk": "STEADY",
      "Image":"https://drive.google.com/uc?export=view&id=15_qDaQnd0J7XkgIzzCd_mqEjYXOKCaUT"
    },
    {
      "Id": 5,
      "Devision": "07",
      "Title": "Harold Nosleep",
      "Subtitle": "70C",
      "Risk": "SAFER",
      "Image":"https://drive.google.com/uc?export=view&id=1V80_qV7gxRDs9KR7seTgCMSe-DagNvQ9"
    },
    {
      "Id": 6,
      "Devision": "08",
      "Title": "Scott Smith",
      "Subtitle": "78C",
      "Risk": "RISKER",
      "Image":"https://drive.google.com/uc?export=view&id=1Um1HHzTqSNaB5W4KfNrI3UkFTzBZoC9K"
    },
    {
      "Id": 7,
      "Devision": "09",
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
      m.Devision = m.Devision + "2";
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
          openWinPositions: [{}],

          searchMode: 'p', //p: people d: devision c: company
          selectedValues: null
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
      this.state.openDataItems.map((ele) => { if(ele && ele.Id !== id) newOpenDataItems.push(ele); });

      let newOpenWindows = [];
      this.openWindows.map((w) => { if(w && w.Id !== id) newOpenWindows.push(w); });
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
          openDataItems: [],
          openWinPositions: [{}]
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

      let curLeft = ((this.state.openWinPositions.length > 0 && this.state.openWinPositions[0].left === -1)? -2 : -1);
      let newOpenWinPositions = [];
      this.state.openDataItems.map((ele) => { 
        newOpenWinPositions.push({
            top: -1,
            left: curLeft,            
        });
        curLeft += KENDO_WIN_WIDTH;
        if(curLeft > window.innerWidth)
          curLeft = ((this.state.openWinPositions.length > 0 && this.state.openWinPositions[0].left === -1)? -2 : -1);
      });

      this.setState({
          openWinPositions: newOpenWinPositions          
      });
    }

    setSearchMode = (mode) =>{
      this.closeAllWins();
      this.setState({
        searchMode: mode,
        selectedValues: null
      })
    }

    handleSelectChange = (event) =>{      
      this.setState({selectedValues: event.value})
    }

    handleFilterChange = (event) => {
      this.setState({
        data: filterBy(availableData.slice(), event.filter),
      });
    };

    render() {
        //const { skip, take } = this.state;
        const { data, openDataItem, openDataItems, openWinPositions, searchMode, selectedValues } = this.state;

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
            <div style={{ margin: 'auto', width: '300px' }}>
              <ButtonGroup>
                  <Button type="button" icon="globe" className={searchMode === 'c' ? 'k-state-active' : ''} 
                      onClick={e => this.setSearchMode('c')}>{'Company'}</Button>
                  <Button type="button" icon="connector" className={searchMode === 'd' ? 'k-state-active' : ''} 
                      onClick={e => this.setSearchMode('d')}>{'Devision'}</Button>
                  <Button type="button" icon="user" className={searchMode === 'p' ? 'k-state-active' : ''} 
                      onClick={e => this.setSearchMode('p')}>{'People'}</Button>
              </ButtonGroup>
            </div>
            {(searchMode === 'p' || searchMode === 'd') &&
              <div style={{ margin: 'auto', width: '500px' }}>
                <MultiSelect
                  filterable
                  data={data}
                  onChange={this.handleSelectChange}
                  onFilterChange={this.handleFilterChange}
                  value={selectedValues}
                  textField= {searchMode === 'd' ? 'Devision' : 'Title'}
                  dataItemKey='Id'
                />
              </div>
            }
            <br/>
            { searchMode === 'c' ? 
              <SClistViewItem dataItem={companyData[0]} setOpenItems={this.setOpenItems}  /> :
              <ListView
                //onScroll={this.scrollHandler}
                data={(selectedValues && selectedValues[0]) ? selectedValues : data}
                item={MyCustomItem}
                style={{ width: "100%", height: 550 }}
                header={myHeader}
              />
            }
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
              <FloatingActionButton align={{ vertical: 'bottom', horizontal: 'end' }} icon={'gear'} 
	              items={[{ icon: 'sort-asc', text: 'Organize' }, { icon: 'close', text: 'Close All'}]} 
                onItemClick={(e) => {
                  if(e){                    
                    // if(e.itemProps.text === 'Organize'){
                    //   this.rearrangeWins();
                    // }
                    // else if(e.itemProps.text === 'Close All'){
                    //   this.closeAllWins();
                    // }
                    if(e.itemIndex === 0){
                      this.rearrangeWins();
                    }
                    else if(e.itemIndex === 1){
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
