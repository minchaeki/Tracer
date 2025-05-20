// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title Traceability - 부속품 및 완제품의 생산/유통 이력 추적
contract Traceability {
    uint256 public globalId;
    uint256 public componentCount;
    uint256 public productCount;

    // 부속품별 사용된 제품 목록
    mapping(uint256 => uint256[]) public productsByComponent;

    /// @notice 공정 단계 구조체
    struct ProcessStep {
        uint256 timestamp;
        string description;
    }

    /// @notice 부속품 구조체
    struct Component {
        uint256 trackingId;
        string name;
        string origin;
        string details;
        ProcessStep[] processSteps;
    }

    /// @notice 완제품 구조체
    struct Product {
        uint256 productId;
        string name;
        uint256[] componentTrackingIds;
    }

    mapping(uint256 => Component) public components;
    mapping(uint256 => Product) public products;

    // 이벤트
    event ComponentCreated(uint256 trackingId, string name);
    event ProductCreated(uint256 productId, string name, uint256[] componentTrackingIds);
    event ProcessStepAdded(uint256 trackingId, string description, uint256 timestamp);

    /// @notice 부속품 생성
    function createComponent(
        string memory _name,
        string memory _origin,
        string memory _details,
        string[] memory _processDescriptions
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Name required");
        require(bytes(_origin).length > 0, "Origin required");
        require(bytes(_details).length > 0, "Details required");

        globalId++;
        componentCount++;

        Component storage comp = components[globalId];
        comp.trackingId = globalId;
        comp.name = _name;
        comp.origin = _origin;
        comp.details = _details;

        for (uint i = 0; i < _processDescriptions.length; i++) {
            require(bytes(_processDescriptions[i]).length > 0, "Step description required");
            comp.processSteps.push(
                ProcessStep({ timestamp: block.timestamp, description: _processDescriptions[i] })
            );
            emit ProcessStepAdded(globalId, _processDescriptions[i], block.timestamp);
        }

        emit ComponentCreated(globalId, _name);
        return globalId;
    }

    /// @notice 공정 단계 추가
    function addProcessStep(uint256 _trackingId, string memory _description) public {
        require(components[_trackingId].trackingId != 0, "Invalid component ID");

        components[_trackingId].processSteps.push(
            ProcessStep({ timestamp: block.timestamp, description: _description })
        );

        emit ProcessStepAdded(_trackingId, _description, block.timestamp);
    }

    /// @notice 완제품 생성 및 부속품 연결
    function createProduct(
        string memory _name,
        uint256[] memory _componentTrackingIds
    ) public returns (uint256) {
        for (uint256 i = 0; i < _componentTrackingIds.length; i++) {
            require(
                components[_componentTrackingIds[i]].trackingId != 0,
                "Invalid component ID"
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

    /// @notice 부속품 정보 조회
    function getComponent(uint256 _trackingId) public view returns (Component memory) {
        require(components[_trackingId].trackingId != 0, "Component does not exist");
        return components[_trackingId];
    }

    /// @notice 완제품 정보 조회
    function getProduct(uint256 _productId) public view returns (Product memory) {
        require(products[_productId].productId != 0, "Product does not exist");
        return products[_productId];
    }

    /// @notice 공정 단계 조회
    function getProcessSteps(uint256 _trackingId) public view returns (ProcessStep[] memory) {
        require(components[_trackingId].trackingId != 0, "Component does not exist");
        return components[_trackingId].processSteps;
    }

    /// @notice 해당 부속품이 사용된 제품 목록 조회
    function getProductsByComponent(uint256 _trackingId) public view returns (uint256[] memory) {
        require(components[_trackingId].trackingId != 0, "Component does not exist");
        return productsByComponent[_trackingId];
    }
}
