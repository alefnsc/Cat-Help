# CatHelp Documentation

[Live Demo](https://cat-help.vercel.app/)

![HelpCat](public/app.png)

![Login](public/login.png)

## Specs

|     | Specs                                                                                                                |
| --- | -------------------------------------------------------------------------------------------------------------------- |
| ✨  | **Next.js** The most fresh technology to frontend built with React.                                             |
| 🔓  | **Web3.js** Handy Dandy library for Blockchain operations.                    |
| 🧙🏼‍♀️  | **TypeScript** typed programming language that builds on JavaScript.                                                                                          |
| 🌬️   | **Tailwind** A utility-first CSS framework for building fast and powerful interfaces.|

## Solidity Contract

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

struct Request {
    uint id;
    address author;
    string title;
    string description;
    string contact;
    uint timestamp;//quantidade de segundos de 1/1/1970 até hoje
    uint goal;//wei
    uint balance;
    bool open;
}


contract CatHelp {
    uint public lastId = 0;
    mapping(uint=>Request) public requests;

    function openRequest(string memory title, string memory description, string memory contact, uint goal) public {
        lastId++;
        requests[lastId]= Request ({
            id: lastId,
            title: title,
            description: description,
            contact: contact,
            goal: goal,
            balance:0,
            timestamp: block.timestamp,
            author: msg.sender,
            open: true
        });
    }

    function closeRequest (uint id) public {
        address author = requests[id].author;
        uint balance = requests[id].balance;
        uint goal = requests[id].balance;
        require(requests[id].open && msg.sender == author || balance >= goal, "Not Allowed");

        requests[id].open = false;

        if (balance > 0) {
            requests[id].balance = 0;
            payable(author).transfer(balance);
        }   
    }

    function donate(uint id) public payable{
            requests[id].balance += msg.value;
           if (requests[id].balance >= requests[id].goal)
                closeRequest(id);

    }
    function getOpenRequests (uint startId, uint quantity) public view returns (Request[] memory) {
        Request[] memory result = new Request[](quantity);
        uint id = startId;
        uint count = 0;
        do {
            if (requests[id].open) {
                result[count] = requests[id];
                count++;
            }

            id++;
        }
        while(count<quantity && id <= lastId);
        
        return result;

}
}
```

## Features

|     | Features                                                                                                             |
| --- | -------------------------------------------------------------------------------------------------------------------- |
| ✅  | Metamask user login                                     |
| ✅  | List of Help Requests                                                    |
| ✅  | Open Requests, Donate to an Existent Request, Close Request                                           |

## Contact

- **Maintainer:** Alexandre Fonseca
- **Email:** alexandrefonsecach@gmail.com
