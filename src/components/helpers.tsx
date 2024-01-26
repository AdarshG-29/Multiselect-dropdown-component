import { ChangeEvent, KeyboardEvent } from "react";
import { Chip } from "../models/chipItems.type";

const filterItems = (items: Chip[], inputChange: string): Chip[] => {
  const value = inputChange.toLowerCase();
  return items.filter((item) => item.label.toLowerCase().includes(value));
};

export const handleRemoveChip = (
  chipId: number,
  selectedItems: Chip[],
  setFilteredItems: React.Dispatch<React.SetStateAction<Chip[]>>,
  setSelectedItems: React.Dispatch<React.SetStateAction<Chip[]>>,
  setbackSpaceFlag: React.Dispatch<React.SetStateAction<number>>
) => {
  const updatedChips = selectedItems.filter((chip) => chip.id !== chipId);
  const removedChip = selectedItems.find((chip) => chip.id === chipId);
  if (removedChip) {
    setFilteredItems((prevItems) => [...prevItems, removedChip]);
  }
  setSelectedItems(updatedChips);
  setbackSpaceFlag(0);
};

export const onHandleBackSpace = (
  inputChange: string,
  event: KeyboardEvent<HTMLInputElement>,
  setbackSpaceFlag: React.Dispatch<React.SetStateAction<number>>
) => {
  if (inputChange === "" && event.key === "Backspace") {
    setbackSpaceFlag((prevState) => (prevState !== 2 ? prevState + 1 : 1));
  }
};

export const handleItemClick = (
  item: Chip,
  selectedItems: Chip[],
  setFilteredItems: React.Dispatch<React.SetStateAction<Chip[]>>,
  setSelectedItems: React.Dispatch<React.SetStateAction<Chip[]>>,
  inputRef: React.RefObject<HTMLInputElement>
) => {
  setSelectedItems((prevItems) => [...prevItems, item]);
  setFilteredItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
  inputRef.current?.focus();
};

export const handleInputChange = (
  event: ChangeEvent<HTMLInputElement>,
  items: Chip[],
  selectedItems: Chip[],
  setInputChange: React.Dispatch<React.SetStateAction<string>>,
  setFilteredItems: React.Dispatch<React.SetStateAction<Chip[]>>
) => {
  const value = event.target.value;
  setInputChange(value);
  const filtered = filterItems(items, value);

  const newFilteredItems = filtered.filter(
    (item) => !selectedItems.some((chip) => chip.id === item.id)
  );

  setFilteredItems(newFilteredItems);
};

export const handleOpenDropdown = (
  setIsOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsOpenDropdown((prevState) => !prevState);
};
