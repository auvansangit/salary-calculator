import createReducer from 'utils/store/createReducer';
import SalaryEntity from 'core/entities/SalaryEntity';
import {
  MAXSOCIAL_AND_HEALTH_INSURANCE,
  MIN_SALARY_RANGE,
  EXCHANGE_SALARY_RANGE,
  TAX_RANGE,
  REDUCTION_FOR_PERSONAL,
  REDUCTION_FOR_DEPENDANT,
  EMPLOYEE_INSURANCE,
  EMPLOYER_INSURANCE
} from 'core/constants/SalaryConstant';

//#region Action

const SALARY_CHANGE = '@@SALARY/CHANGE';

interface ChangeAction {
  type: typeof SALARY_CHANGE;
  payload: {
    grossSalary: number;
    socialInsurance: number;
    healthInsurance: number;
    unemploymentInsurance: number;

    employerSocialIncurance: number;
    employerHelthIncurance: number;
    employerUnemploymentInsurance: number;
    employerPayTotal: number;

    incomeBeforeTax: number;
    reductionForPersonal: number;
    reductionForDependant: number;

    taxableIncome: number;
    tax: Number[];
    personalIncomeTax: number;
    netSalary: number;
  };
}

//#endregion

//#region Action Creators

const getTax = (taxableIncome: number) => {
  let tax: number[] = [];

  for (let index = 0; index < TAX_RANGE.length; index++) {
    const taxPercentage = TAX_RANGE[index][0];
    const taxAmount = TAX_RANGE[index][1];

    let amount = taxableIncome <= taxAmount ? taxableIncome : taxAmount;
    tax.push(amount * taxPercentage);
    taxableIncome -= taxAmount;

    if (taxableIncome <= 0) {
      break;
    }
  }

  return tax;
};

const getEmployeeInsurance = (entity: SalaryEntity, grossSalary: number) => {
  let insuranceSalary = grossSalary;

  if (!entity.baseInsurance) {
    insuranceSalary = entity.baseSalary;
  }

  if (insuranceSalary < MIN_SALARY_RANGE[entity.region - 1]) {
    return {
      socialInsurance: 0,
      healthInsurance: 0,
      unemploymentInsurance: 0
    };
  }

  let socialInsurance = (insuranceSalary * EMPLOYEE_INSURANCE.SOCIAL) / 100;
  let healthInsurance = (insuranceSalary * EMPLOYEE_INSURANCE.HEALTH) / 100;

  if (~~insuranceSalary > MAXSOCIAL_AND_HEALTH_INSURANCE) {
    socialInsurance =
      (MAXSOCIAL_AND_HEALTH_INSURANCE * EMPLOYEE_INSURANCE.SOCIAL) / 100;
    healthInsurance =
      (MAXSOCIAL_AND_HEALTH_INSURANCE * EMPLOYEE_INSURANCE.HEALTH) / 100;
  }

  let maxUnemploymentInsurance = 20 * MIN_SALARY_RANGE[entity.region - 1];
  let unemploymentInsurance =
    (insuranceSalary * EMPLOYEE_INSURANCE.UNEMPLOYEE) / 100;

  if (~~insuranceSalary > maxUnemploymentInsurance) {
    unemploymentInsurance =
      (maxUnemploymentInsurance * EMPLOYEE_INSURANCE.UNEMPLOYEE) / 100;
  }

  return {
    socialInsurance,
    healthInsurance,
    unemploymentInsurance
  };
};

const getEmployerInsurance = (entity: SalaryEntity, grossSalary: number) => {
  let insuranceSalary = grossSalary;

  if (!entity.baseInsurance) {
    insuranceSalary = entity.baseSalary;
  }

  if (insuranceSalary < MIN_SALARY_RANGE[entity.region - 1]) {
    return {
      socialInsurance: 0,
      healthInsurance: 0,
      unemploymentInsurance: 0
    };
  }

  let socialInsurance = (insuranceSalary * EMPLOYER_INSURANCE.SOCIAL) / 100;
  let healthInsurance = (insuranceSalary * EMPLOYER_INSURANCE.HEALTH) / 100;

  if (~~insuranceSalary > MAXSOCIAL_AND_HEALTH_INSURANCE) {
    socialInsurance =
      (MAXSOCIAL_AND_HEALTH_INSURANCE * EMPLOYER_INSURANCE.SOCIAL) / 100;
    healthInsurance =
      (MAXSOCIAL_AND_HEALTH_INSURANCE * EMPLOYER_INSURANCE.HEALTH) / 100;
  }

  let maxUnemploymentInsurance = 20 * MIN_SALARY_RANGE[entity.region - 1];
  let unemploymentInsurance =
    (insuranceSalary * EMPLOYER_INSURANCE.UNEMPLOYEE) / 100;

  if (~~insuranceSalary > maxUnemploymentInsurance) {
    unemploymentInsurance =
      (maxUnemploymentInsurance * EMPLOYER_INSURANCE.UNEMPLOYEE) / 100;
  }

  return {
    socialInsurance,
    healthInsurance,
    unemploymentInsurance
  };
};

const netToGross = (entity: SalaryEntity) => {
  let reductionForDependant =
    REDUCTION_FOR_DEPENDANT * entity.numberOfDependant;
  let temp = entity.income - REDUCTION_FOR_PERSONAL - reductionForDependant;
  let exachangeTax = EXCHANGE_SALARY_RANGE.filter(value => temp <= value[0])[0];
  let taxableIncome = ((temp - exachangeTax[1]) / exachangeTax[2]) * 1000000;
  let tax: number[] = getTax(taxableIncome);
  let incomeBeforeTax =
    taxableIncome + REDUCTION_FOR_PERSONAL + reductionForDependant;

  let grossSalaryExchange =
    incomeBeforeTax / (1 - EMPLOYEE_INSURANCE.ALL / 100);

  let employeeInsurance = getEmployeeInsurance(entity, grossSalaryExchange);

  let grossSalary =
    incomeBeforeTax +
    employeeInsurance.socialInsurance +
    employeeInsurance.healthInsurance +
    employeeInsurance.unemploymentInsurance;

  employeeInsurance = getEmployeeInsurance(entity, grossSalary);
  let employerInsurance = getEmployerInsurance(entity, grossSalary);

  let personalIncomeTax =
    tax.length > 0
      ? tax.reduce((sum: number, current: number) => (sum += current))
      : 0;

  let employerPayTotal =
    grossSalary +
    employerInsurance.socialInsurance +
    employerInsurance.healthInsurance +
    employerInsurance.unemploymentInsurance;

  return {
    flag: true,
    grossSalary,
    socialInsurance: employeeInsurance.socialInsurance,
    healthInsurance: employeeInsurance.healthInsurance,
    unemploymentInsurance: employeeInsurance.unemploymentInsurance,
    employerPayTotal,

    employerSocialIncurance: employerInsurance.socialInsurance,
    employerHelthIncurance: employerInsurance.healthInsurance,
    employerUnemploymentInsurance: employerInsurance.unemploymentInsurance,

    incomeBeforeTax,
    reductionForPersonal: REDUCTION_FOR_PERSONAL,
    reductionForDependant,
    taxableIncome,
    tax,
    personalIncomeTax,
    netSalary: entity.income
  };
};

const grossToNet = (entity: SalaryEntity) => {
  let grossSalary = entity.income;
  let insurance = getEmployeeInsurance(entity, grossSalary);
  let employerInsurance = getEmployerInsurance(entity, grossSalary);
  let reductionForDependant =
    REDUCTION_FOR_DEPENDANT * entity.numberOfDependant;

  let incomeBeforeTax =
    grossSalary -
    insurance.socialInsurance -
    insurance.healthInsurance -
    insurance.unemploymentInsurance;

  let taxableIncome =
    incomeBeforeTax - REDUCTION_FOR_PERSONAL - reductionForDependant;

  let tax: number[] = getTax(taxableIncome);

  let personalIncomeTax =
    tax.length > 0
      ? tax.reduce((sum: number, current: number) => (sum += current))
      : 0;

  let employerPayTotal =
    grossSalary +
    employerInsurance.socialInsurance +
    employerInsurance.healthInsurance +
    employerInsurance.unemploymentInsurance;

  return {
    flag: false,
    grossSalary,
    socialInsurance: insurance.socialInsurance,
    healthInsurance: insurance.healthInsurance,
    unemploymentInsurance: insurance.unemploymentInsurance,

    employerSocialIncurance: employerInsurance.socialInsurance,
    employerHelthIncurance: employerInsurance.healthInsurance,
    employerUnemploymentInsurance: employerInsurance.unemploymentInsurance,
    employerPayTotal,

    incomeBeforeTax,
    reductionForPersonal: REDUCTION_FOR_PERSONAL,
    reductionForDependant,
    taxableIncome,
    tax,
    personalIncomeTax,
    netSalary: incomeBeforeTax - personalIncomeTax
  };
};

export const actionCreators = {
  change: (entity: SalaryEntity, type: boolean) => {
    let calculateFn = netToGross;

    if (!type) {
      calculateFn = grossToNet;
    }

    return <ChangeAction>{
      type: SALARY_CHANGE,
      payload: {
        entity: entity,
        ...calculateFn(entity)
      }
    };
  }
};

//#endregion

//#region State

export interface State {
  flag: boolean;
  grossSalary: number;
  socialInsurance: number;
  healthInsurance: number;
  unemploymentInsurance: number;

  employerSocialIncurance: number;
  employerHelthIncurance: number;
  employerUnemploymentInsurance: number;
  employerPayTotal: number;

  incomeBeforeTax: number;
  reductionForPersonal: number;
  reductionForDependant: number;

  taxableIncome: number;
  tax: number[];
  personalIncomeTax: number;
  netSalary: number;
}

const initialState: State = {
  flag: true,
  grossSalary: 0,
  socialInsurance: 0,
  healthInsurance: 0,
  unemploymentInsurance: 0,

  employerSocialIncurance: 0,
  employerHelthIncurance: 0,
  employerUnemploymentInsurance: 0,
  employerPayTotal: 0,

  incomeBeforeTax: 0,
  reductionForPersonal: 0,
  reductionForDependant: 0,
  taxableIncome: 0,
  tax: [],
  personalIncomeTax: 0,
  netSalary: 0
};

//#endregion

//#region Reducer

export const reducer = createReducer(initialState, {
  [SALARY_CHANGE]: (prevState: State, action: ChangeAction) => ({
    ...prevState,
    ...action.payload
  })
});

//#endregion
