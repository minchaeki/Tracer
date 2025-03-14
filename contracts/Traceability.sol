// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Traceability {
    uint256 public globalId;
    uint256 public componentCount;
    uint256 public productCount;
    mapping(uint256 => uint256[]) public productsByComponent;

    struct ProcessStep {
        uint256 timestamp;
        string description;
    }

    struct Component {
        uint256 trackingId;
        string name;
        string origin;
        string details;
        ProcessStep[] processSteps;
    }

    struct Product {
        uint256 productId;
        string name;
        uint256[] componentTrackingIds;
    }

    mapping(uint256 => Component) public components;
    mapping(uint256 => Product) public products;

    event ComponentCreated(uint256 trackingId, string name);
    event ProductCreated(uint256 productId, string name, uint256[] componentTrackingIds);
    event ProcessStepAdded(uint256 trackingId, string description, uint256 timestamp);

    function createComponent(
        string memory _name,
        string memory _origin,
        string memory _details
    ) public returns (uint256) {
        globalId++;
        componentCount++;

        Component storage comp = components[globalId];
        comp.trackingId = globalId;
        comp.name = _name;
        comp.origin = _origin;
        comp.details = _details;

        emit ComponentCreated(globalId, _name);
        return globalId;
    }

    function addProcessStep(uint256 _trackingId, string memory _description) public {
        require(components[_trackingId].trackingId != 0, "Invalid component ID");
        components[_trackingId].processSteps.push(ProcessStep(block.timestamp, _description));
        emit ProcessStepAdded(_trackingId, _description, block.timestamp);
    }

    function createProduct(
        string memory _name,
        uint256[] memory _componentTrackingIds
    ) public returns (uint256) {
        for (uint256 i = 0; i < _componentTrackingIds.length; i++) {
            require(
                components[_componentTrackingIds[i]].trackingId != 0,
                "Invalid component ID in product creation"
            );
        }
        globalId++;
        productCount++;

        products[globalId] = Product({
            productId: globalId,
            name: _name,
            componentTrackingIds: _componentTrackingIds
        });

        for (uint256 i = 0; i < _componentTrackingIds.length; i++) {
            productsByComponent[_componentTrackingIds[i]].push(globalId);
        }

        emit ProductCreated(globalId, _name, _componentTrackingIds);
        return globalId;
    }

    function getComponent(uint256 _trackingId) public view returns (Component memory) {
        require(components[_trackingId].trackingId != 0, "Component does not exist");
        return components[_trackingId];
    }

    function getProduct(uint256 _productId) public view returns (Product memory) {
        require(products[_productId].productId != 0, "Product does not exist");
        return products[_productId];
    }

    function getProcessSteps(uint256 _trackingId) public view returns (ProcessStep[] memory) {
        require(components[_trackingId].trackingId != 0, "Component does not exist");
        return components[_trackingId].processSteps;
    }

    function getProductsByComponent(uint256 _trackingId) public view returns (uint256[] memory) {
        require(components[_trackingId].trackingId != 0, "Component does not exist");
        return productsByComponent[_trackingId];
    }
}
