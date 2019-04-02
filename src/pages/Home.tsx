import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';
import {
  Paper,
  Typography,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControlLabel,
  Radio,
  Button
} from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { ArrowRightAltOutlined } from '@material-ui/icons';

import NumericInput from '../components/inputs/NumbericInput';

import {
  GENERAL_MIN_SALARY,
  EMPLOYEE_INSURANCE,
  EMPLOYER_INSURANCE,
  REDUCTION_FOR_PERSONAL,
  REDUCTION_FOR_DEPENDANT,
  TAX_RANGE_DETAIL
} from '../core/constants/SalaryConstant';

import useLocalState from '../utils/store/useLocalState';
import { reducer, actionCreators } from '../store/Salary';
import SalaryEntity from '../core/entities/SalaryEntity';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),

    '& > div': {
      marginRight: theme.spacing(2)
    },
    '& > label': {
      marginRight: theme.spacing(12)
    }
  },
  sectionAction: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),

    '& > button': {
      marginRight: theme.spacing(2)
    },

    '& table tr > td:first-child, & table tr > th:first-child': {
      width: 360,
      textAlign: 'right'
    }
  },
  textBox: {
    width: theme.spacing(18)
  }
}));

const Home = () => {
  const [entity, setEntity] = useState(() => {
    let entity: SalaryEntity = {
      income: 0,
      baseInsurance: true,
      baseSalary: 0,
      region: 1,
      numberOfDependant: 0
    };

    return entity;
  });

  const [state, actions] = useLocalState(reducer, actionCreators);
  const [t] = useTranslation('homePage');
  const classes = useStyles();

  const handleTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    let targetValue = event.target.value.trim();

    setEntity({
      ...entity,
      [event.target.name]: parseFloat(targetValue)
    });
  };

  const handleBaseSalaryRadioChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEntity({
      ...entity,
      [event.target.name]: event.target.value == 'true'
    });
  };

  const handleRegionRadioChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEntity({
      ...entity,
      [event.target.name]: parseInt(event.target.value)
    });
  };

  const handleCalculator = (type: boolean) => {
    let data = {
      ...entity,
      income: entity.income.toString() == 'NaN' ? 0 : entity.income
    };
    actions.change(data, type);
  };

  const formatCurrency = (value: Number) => {
    value = value || 0;
    return value.toLocaleString('vi-VN', {
      minimumFractionDigits: 2,
      style: 'currency',
      currency: t('currency')
    });
  };

  return (
    <>
      <Helmet
        title={t('pageName')}
        meta={[
          {
            name: 'description',
            content: `${t('pageDescription')}`
          },
          {
            property: 'og:title',
            content: `${t('pageName')}`
          },
          {
            property: 'og:site_name',
            content: `${t('pageName')}`
          },
          {
            property: 'og:url',
            content: `${t('pageUrl')}`
          },
          {
            property: 'og:description',
            content: `${t('pageDescription')}`
          },
          {
            property: 'og:type',
            content: `website`
          },
          {
            property: 'og:image',
            content: `http://localhost:8000/favicon.ico`
          }
        ]}
        link={[
          {
            rel: 'canonical',
            href: `${t('pageUrl')}`
          }
        ]}
      />
      <Typography component="h1" variant="h4">
        {t('pageTitle')}
      </Typography>
      <Typography component="h2" variant="h5">
        {t('pageDescription')}
      </Typography>
      <br />
      <Typography component="h3" variant="h6">
        1. {t('income')}
      </Typography>
      <Paper className={classes.section}>
        <TextField
          className={classes.textBox}
          label={t('income')}
          margin="normal"
          name="income"
          value={entity.income}
          onChange={handleTextChanged}
          InputProps={{
            inputComponent: NumericInput as any
          }}
        />
      </Paper>
      <Typography component="h3" variant="h6">
        2. {t('insurance')}
      </Typography>
      <Paper className={classes.section}>
        <FormControlLabel
          control={
            <Radio
              checked={entity.baseInsurance}
              value={true}
              name="baseInsurance"
              aria-label={t('fullWange')}
              onChange={handleBaseSalaryRadioChanged}
            />
          }
          label={t('fullWange')}
        />
        <FormControlLabel
          control={
            <Radio
              checked={!entity.baseInsurance}
              value={false}
              name="baseInsurance"
              aria-label={t('other')}
              onChange={handleBaseSalaryRadioChanged}
            />
          }
          label={t('other')}
        />
        <FormControlLabel
          control={
            <TextField
              className={classes.textBox}
              margin="normal"
              name="baseSalary"
              disabled={entity.baseInsurance}
              value={entity.baseSalary}
              onChange={handleTextChanged}
              InputProps={{
                inputComponent: NumericInput as any
              }}
            />
          }
          label=""
        />
      </Paper>
      <Paper className={classes.section}>
        <TextField
          className={classes.textBox}
          label={t('minimumWage')}
          margin="normal"
          name="minSalary"
          value={GENERAL_MIN_SALARY}
          InputProps={{
            inputComponent: NumericInput as any
          }}
        />
        <TextField
          className={classes.textBox}
          label={t('social')}
          margin="normal"
          name="socialInsurance"
          value={EMPLOYEE_INSURANCE.SOCIAL}
          InputProps={{
            inputComponent: NumericInput as any
          }}
        />
        <TextField
          className={classes.textBox}
          label={t('health')}
          margin="normal"
          name="healthInsurance"
          value={EMPLOYEE_INSURANCE.HEALTH}
          InputProps={{
            inputComponent: NumericInput as any
          }}
        />
        <TextField
          className={classes.textBox}
          label={t('unemployee')}
          margin="normal"
          name="unemployeeInsurance"
          value={EMPLOYEE_INSURANCE.UNEMPLOYEE}
          InputProps={{
            inputComponent: NumericInput as any
          }}
        />
      </Paper>
      <Paper className={classes.section}>
        <FormControlLabel
          control={
            <Radio
              checked={entity.region === 1}
              value={1}
              name="region"
              aria-label={t('region', { region: 1 })}
              onChange={handleRegionRadioChanged}
            />
          }
          label={t('region', { region: 1 })}
        />
        <FormControlLabel
          control={
            <Radio
              checked={entity.region === 2}
              value={2}
              name="region"
              aria-label={t('region', { region: 2 })}
              onChange={handleRegionRadioChanged}
            />
          }
          label={t('region', { region: 2 })}
        />
        <FormControlLabel
          control={
            <Radio
              checked={entity.region === 3}
              value={3}
              name="region"
              aria-label={t('region', { region: 3 })}
              onChange={handleRegionRadioChanged}
            />
          }
          label={t('region', { region: 3 })}
        />
        <FormControlLabel
          control={
            <Radio
              checked={entity.region === 4}
              value={4}
              name="region"
              aria-label={t('region', { region: 4 })}
              onChange={handleRegionRadioChanged}
            />
          }
          label={t('region', { region: 4 })}
        />
      </Paper>
      <Typography component="h3" variant="h6">
        3. {t('reductionBase')}
      </Typography>
      <Paper className={classes.section}>
        <TextField
          className={classes.textBox}
          label={t('personal')}
          margin="normal"
          name="reductionForPersonal"
          value={REDUCTION_FOR_PERSONAL}
          InputProps={{
            inputComponent: NumericInput as any
          }}
        />
        <TextField
          label={t('dependant')}
          margin="normal"
          name="reductionForDependant"
          value={REDUCTION_FOR_DEPENDANT}
          InputProps={{
            inputComponent: NumericInput as any
          }}
        />
        <TextField
          className={classes.textBox}
          label={t('noDependant')}
          margin="normal"
          name="numberOfDependant"
          value={entity.numberOfDependant}
          onChange={handleTextChanged}
          InputProps={{
            inputComponent: NumericInput as any
          }}
        />
      </Paper>
      <div className={classes.sectionAction}>
        <Button
          variant={state.flag ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => handleCalculator(true)}
        >
          {t('net')} <ArrowRightAltOutlined /> {t('gross')}
        </Button>
        <Button
          variant={state.flag ? 'outlined' : 'contained'}
          color="primary"
          onClick={() => handleCalculator(false)}
        >
          {t('gross')} <ArrowRightAltOutlined /> {t('net')}
        </Button>
      </div>
      <Typography component="h3" variant="h6">
        {t('explain')}
      </Typography>
      <Paper className={classes.sectionAction}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>{t('grossSalary')}</TableCell>
              <TableCell>{formatCurrency(state.grossSalary)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {t('socialInsurance')} ({EMPLOYEE_INSURANCE.SOCIAL}%)
              </TableCell>
              <TableCell>{formatCurrency(state.socialInsurance)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {t('healthInsurance')} ({EMPLOYEE_INSURANCE.HEALTH}%)
              </TableCell>
              <TableCell>{formatCurrency(state.healthInsurance)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {t('unemploymentInsurance')} ({EMPLOYEE_INSURANCE.UNEMPLOYEE}%)
              </TableCell>
              <TableCell>
                {formatCurrency(state.unemploymentInsurance)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('incomeBeforeTax')}</TableCell>
              <TableCell>{formatCurrency(state.incomeBeforeTax)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('reductionForPersonal')}</TableCell>
              <TableCell>
                {formatCurrency(state.reductionForPersonal)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('reductionForDependant')}</TableCell>
              <TableCell>
                {formatCurrency(state.reductionForDependant)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('taxableIncome')}</TableCell>
              <TableCell>{formatCurrency(state.taxableIncome)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('personalIncomeTax')}</TableCell>
              <TableCell>{formatCurrency(state.personalIncomeTax)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('netSalary')}</TableCell>
              <TableCell>{formatCurrency(state.netSalary)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      <Typography component="h4" variant="subtitle1">
        {t('personalIncomeTaxDetails')}
      </Typography>
      <Paper className={classes.sectionAction}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('theTaxable')}</TableCell>
              <TableCell>{t('theTaxRate')}</TableCell>
              <TableCell>{t('thePayment')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {TAX_RANGE_DETAIL.map((value, index) => {
              if (index === 0) {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      {t('toMillion', {
                        to: formatCurrency(TAX_RANGE_DETAIL[0][1])
                      })}
                    </TableCell>
                    <TableCell>{`${TAX_RANGE_DETAIL[0][2]}%`}</TableCell>
                    <TableCell>{formatCurrency(state.tax[0])}</TableCell>
                  </TableRow>
                );
              } else if (index === TAX_RANGE_DETAIL.length - 1) {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      {t('upperMillion', {
                        from: formatCurrency(TAX_RANGE_DETAIL[6][0])
                      })}
                    </TableCell>
                    <TableCell>{`${TAX_RANGE_DETAIL[6][2]}%`}</TableCell>
                    <TableCell>{formatCurrency(state.tax[6])}</TableCell>
                  </TableRow>
                );
              } else {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      {t('upperToMillion', {
                        from: formatCurrency(value[0]),
                        to: formatCurrency(value[1])
                      })}
                    </TableCell>
                    <TableCell>{`${value[2]}%`}</TableCell>
                    <TableCell>{formatCurrency(state.tax[index])}</TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </Paper>
      <Typography component="h3" variant="h6">
        {t('employerPay')}
      </Typography>
      <Paper className={classes.sectionAction}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>{t('grossSalary')}</TableCell>
              <TableCell>{formatCurrency(state.grossSalary)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {t('socialInsurance')} ({EMPLOYER_INSURANCE.SOCIAL}%)
              </TableCell>
              <TableCell>
                {formatCurrency(state.employerSocialIncurance)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {t('healthInsurance')} ({EMPLOYER_INSURANCE.HEALTH}%)
              </TableCell>
              <TableCell>
                {formatCurrency(state.employerHelthIncurance)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {t('unemploymentInsurance')} ({EMPLOYER_INSURANCE.UNEMPLOYEE}%)
              </TableCell>
              <TableCell>
                {formatCurrency(state.employerUnemploymentInsurance)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('total')}</TableCell>
              <TableCell>{formatCurrency(state.employerPayTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default Home;
