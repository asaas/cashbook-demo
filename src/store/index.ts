/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { reactive, watch } from 'vue';

import { Account } from '../types/account';
import { Journal } from '../types/journal';
import { JournalTemplate } from '../types/journal-template';

export interface State {
  accounts: readonly Account[];
  selfAccountId: number;
  selfAccount: Account;
  journals: readonly Journal[];
  filteredJournals: readonly Journal[];
  description: string;
  corrAccountId: number;
  corrAccount: Account;
  amount: string;
  journalTemplates: readonly JournalTemplate[];
  filteredJournalTemplates: readonly JournalTemplate[];
  templateTableVisible: boolean;
  focusDescriptionInput: (() => void) | null;
}

export class Store {
  public state: State;

  constructor(initialState: State) {
    this.state = reactive({ ...initialState });

    this.computeFilteredJournals();
    this.computeFilteredJournalTemplates();

    watch(
      () => this.state.selfAccountId,
      () => {
        this.computeFilteredJournals();
        this.computeFilteredJournalTemplates();
        this.computeSelfAccount();
      }
    );

    watch(
      () => this.state.corrAccountId,
      () => {
        this.computeCorrAccount();
      }
    );

    watch(
      () => this.state.journals,
      () => {
        this.computeFilteredJournals();
      }
    );
  }

  handleSelfAccountChange(id: number) {
    this.state.selfAccountId = id;
  }

  handleDescriptionChange(description: string) {
    this.state.description = description;
  }

  handleCorrAccountChange(id: number) {
    this.state.corrAccountId = id;
  }

  handleAmountChange(amount: string) {
    this.state.amount = amount;
  }

  handleSubmit() {
    const {
      selfAccount,
      corrAccount,
      description,
      amount
    } = this.state;

    this.addJournal({
      selfAccountId: selfAccount.id,
      selfAccountName: selfAccount.name,
      corrAccountId: corrAccount.id,
      corrAccountName: corrAccount.name,
      description,
      amount
    });

    this.clearForm();
  }

  handleDescriptionInputFocus() {
    this.state.templateTableVisible = true;
  }

  handleDescriptionInputBlur() {
    this.state.templateTableVisible = false;
  }

  setFocusDescriptionInput(focusDescriptionInput: () => void) {
    this.state.focusDescriptionInput = focusDescriptionInput;
  }

  handleItemSelect(id: number) {
    const item = this.state.journalTemplates.find(_ => _.id === id);

    if (item) {
      this.setTemplateToForm(item);
    }
  }

  handleIndexInput(index: string) {
    const item = this.state.filteredJournalTemplates.find((_, i) => `-${i + 1}` === index);

    if (item) {
      this.setTemplateToForm(item);
    }
  }

  private computeFilteredJournals() {
    this.state.filteredJournals =
      this.state.journals.filter(_ => _.selfAccountId === this.state.selfAccountId);
  }

  private computeFilteredJournalTemplates() {
    this.state.filteredJournalTemplates =
      this.state.journalTemplates.filter(_ => _.selfAccountId === this.state.selfAccountId);
  }

  private computeSelfAccount() {
    this.state.selfAccount = this.state.accounts.find(_ => _.id === this.state.selfAccountId)!
  }

  private computeCorrAccount() {
    this.state.corrAccount = this.state.accounts.find(_ => _.id === this.state.corrAccountId)!
  }

  private addJournal(journal: Omit<Journal, 'id'>) {
    this.state.journals =
    [...this.state.journals, { ...journal, id: this.state.journals.length + 1 }];
  }

  private clearForm() {
    this.state.description = ''
    this.state.corrAccountId = 1
    this.state.amount = ''
  }

  private setTemplateToForm(item: JournalTemplate) {
    this.state.description = item.description;
    this.state.corrAccountId = item.corrAccountId;
    this.state.amount = item.amount;

    if (this.state.focusDescriptionInput) {
      this.state.focusDescriptionInput();
    }
  }
}

export const initialState = reactive<State>({
  accounts: [
    { id: 1, name: '現金' },
    { id: 2, name: '預金' },
    { id: 3, name: '売上' },
    { id: 4, name: '仕入' },
    { id: 5, name: '給料' },
    { id: 6, name: '雑収入' }
  ],
  selfAccountId: 1,
  selfAccount: { id: 1, name: '現金' },
  journals: [
    {
      id: 1,
      selfAccountId: 1,
      selfAccountName: '現金',
      corrAccountId: 3,
      corrAccountName: '売上',
      description: '自科目=現金',
      amount: '1000'
    },
    {
      id: 2,
      selfAccountId: 1,
      selfAccountName: '現金',
      corrAccountId: 3,
      corrAccountName: '売上',
      description: '自科目=現金',
      amount: '2000'
    },
    {
      id: 3,
      selfAccountId: 1,
      selfAccountName: '現金',
      corrAccountId: 3,
      corrAccountName: '売上',
      description: '自科目=現金',
      amount: '3000'
    },
    {
      id: 4,
      selfAccountId: 1,
      selfAccountName: '現金',
      corrAccountId: 3,
      corrAccountName: '雑収入',
      description: '自科目=現金',
      amount: '4000'
    },
    {
      id: 5,
      selfAccountId: 2,
      selfAccountName: '預金',
      corrAccountId: 3,
      corrAccountName: '売上',
      description: '自科目=預金',
      amount: '5000'
    },
    {
      id: 6,
      selfAccountId: 4,
      selfAccountName: '仕入',
      corrAccountId: 1,
      corrAccountName: '現金',
      description: '自科目=仕入',
      amount: '6000'
    }
  ],
  filteredJournals: [],
  description: '',
  corrAccountId: 1,
  corrAccount: { id: 1, name: '現金' },
  amount: '',
  journalTemplates: [
    {
      id: 1,
      selfAccountId: 1,
      corrAccountId: 3,
      description: '自科目=現金, 相手科目=売上, 金額=1000',
      amount: '1000'
    },
    {
      id: 2,
      selfAccountId: 1,
      corrAccountId: 3,
      description: '自科目=現金, 相手科目=売上, 金額=2000',
      amount: '2000'
    },
    {
      id: 3,
      selfAccountId: 1,
      corrAccountId: 6,
      description: '自科目=現金, 相手科目=雑収入, 金額=3000',
      amount: '3000'
    },
    {
      id: 4,
      selfAccountId: 4,
      corrAccountId: 1,
      description: 'test1',
      amount: '4000'
    },
    {
      id: 5,
      selfAccountId: 4,
      corrAccountId: 2,
      description: 'test2',
      amount: '5000'
    },
    {
      id: 6,
      selfAccountId: 6,
      corrAccountId: 1,
      description: 'test3',
      amount: '6000'
    }
  ],
  filteredJournalTemplates: [],
  templateTableVisible: false,
  focusDescriptionInput: null
});
