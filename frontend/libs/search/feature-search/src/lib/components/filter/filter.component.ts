import {Component, EventEmitter, Input, Output} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: "lib-filter",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
})
export class FilterComponent {
  @Input() selectedGender = "";
  @Output() selectedGenderChange = new EventEmitter<string>();

  @Input() selectedStatus = "";
  @Output() selectedStatusChange = new EventEmitter<string>();

  @Output() filterChange = new EventEmitter<void>();

  isFiltersExpanded = false;
  isGenderActionSheetOpen = false;
  isStatusActionSheetOpen = false;

  genderOptions = [
    {value: "", label: "All Genders"},
    {value: "Male", label: "Male"},
    {value: "Female", label: "Female"},
    {value: "Genderless", label: "Genderless"},
    {value: "unknown", label: "Unknown"},
  ];

  statusOptions = [
    {value: "", label: "All Status"},
    {value: "Alive", label: "Alive"},
    {value: "Dead", label: "Dead"},
    {value: "unknown", label: "Unknown"},
  ];

  toggleFilters() {
    this.isFiltersExpanded = !this.isFiltersExpanded;
  }

  onFilterChange() {
    this.filterChange.emit();
  }

  openGenderActionSheet() {
    this.isGenderActionSheetOpen = true;
  }

  closeGenderActionSheet() {
    this.isGenderActionSheetOpen = false;
  }

  openStatusActionSheet() {
    this.isStatusActionSheetOpen = true;
  }

  closeStatusActionSheet() {
    this.isStatusActionSheetOpen = false;
  }

  selectGender(value: string) {
    this.selectedGender = value;
    this.selectedGenderChange.emit(value);
    this.closeGenderActionSheet();
    this.onFilterChange();
  }

  selectStatus(value: string) {
    this.selectedStatus = value;
    this.selectedStatusChange.emit(value);
    this.closeStatusActionSheet();
    this.onFilterChange();
  }

  getSelectedGenderLabel(): string {
    const option = this.genderOptions.find(
      (opt) => opt.value === this.selectedGender
    );
    return option ? option.label : "All Genders";
  }

  getSelectedStatusLabel(): string {
    const option = this.statusOptions.find(
      (opt) => opt.value === this.selectedStatus
    );
    return option ? option.label : "All Status";
  }
}
