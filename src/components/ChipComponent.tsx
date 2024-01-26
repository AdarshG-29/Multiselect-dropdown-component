import React, {
    useState,
    useEffect,
    useRef,
    ChangeEvent,
    KeyboardEvent,
  } from "react";
  import {
    handleRemoveChip,
    onHandleBackSpace,
    handleItemClick,
    handleInputChange,
    handleOpenDropdown,
  } from "./helpers";
  
  import "./styles.css";
  import { Chip } from "../models/chipItems.type";
  
  interface ChipComponentProps {
    items: Chip[];
  }
  const ChipComponent: React.FC<ChipComponentProps> = ({ items }) => {
    const [filteredItems, setFilteredItems] = useState<Chip[]>([]);
    const [selectedItems, setSelectedItems] = useState<Chip[]>([]);
    const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
    const [backSpaceFlag, setbackSpaceFlag] = useState<number>(0);
    const [inputChange, setInputChange] = useState<string>("");
  
    const inputRef = useRef<HTMLInputElement>(null);
  
    useEffect(() => {
      setFilteredItems(items);
    }, [items]);
  
    const handleRemoveChipWrapper = (chipId: number) => {
      handleRemoveChip(
        chipId,
        selectedItems,
        setFilteredItems,
        setSelectedItems,
        setbackSpaceFlag
      );
    };
  
    const onHandleBackSpaceWrapper = (event: KeyboardEvent<HTMLInputElement>) => {
      onHandleBackSpace(inputChange, event, setbackSpaceFlag);
    };
  
    const handleItemClickWrapper = (item: Chip) => {
      handleItemClick(
        item,
        selectedItems,
        setFilteredItems,
        setSelectedItems,
        inputRef
      );
    };
  
    const handleInputChangeWrapper = (event: ChangeEvent<HTMLInputElement>) => {
      handleInputChange(
        event,
        items,
        selectedItems,
        setInputChange,
        setFilteredItems
      );
    };
  
    const handleOpenDropdownWrapper = () => {
      handleOpenDropdown(setIsOpenDropdown);
    };
  
    useEffect(() => {
      if (backSpaceFlag === 2 && selectedItems.length > 0) {
        handleRemoveChipWrapper(selectedItems[selectedItems.length - 1].id);
      }
    }, [backSpaceFlag, selectedItems]);
  
    return (
      <div className="chip-component">
        <div className="chip-list">
          {selectedItems.map((chip) => (
            <div
              key={chip.id}
              className={`chip ${
                chip.id === selectedItems[selectedItems.length - 1].id &&
                backSpaceFlag === 1
                  ? "chip-highlighted"
                  : ""
              }`}
            >
              {chip.label}
              <span onClick={() => handleRemoveChipWrapper(chip.id)}>
                &times;
              </span>
            </div>
          ))}
          <input
            type="text"
            onChange={handleInputChangeWrapper}
            placeholder={"Add new Item"}
            onClick={handleOpenDropdownWrapper}
            ref={inputRef}
            onKeyDown={onHandleBackSpaceWrapper}
          />
        </div>
  
        {isOpenDropdown && (
          <ul className="item-list">
            {filteredItems.map((item) => (
              <li key={item.id} onClick={() => handleItemClickWrapper(item)}>
                {item.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default ChipComponent;
  