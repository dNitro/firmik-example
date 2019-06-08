import "./helper.css";
import React from "react";
import { render } from "react-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import { I18nProvider, I18n } from "@lingui/react";
import { t } from "@lingui/macro";
import enCatalog from "./locale/en/messages";
import deCatalog from "./locale/de/messages";
const catalogs = {
  en: enCatalog,
  de: deCatalog
};

class App extends React.Component {
  state = {
    lang: "en"
  };
  toggleLanguage = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        lang: prevState.lang === "en" ? "de" : "en"
      };
    });
  };
  render() {
    return (
      <I18nProvider language={this.state.lang} catalogs={catalogs}>
        <div className="app">
          <h1>
            Basic{" "}
            <a
              href="https://github.com/jaredpalmer/formik"
              target="_blank"
              rel="noopener"
            >
              Formik
            </a>{" "}
            Demo
          </h1>
          <button onClick={this.toggleLanguage}>
            {this.state.lang.toUpperCase()}
          </button>
          <I18n>
            {({ i18n }) => (
              <Formik
                initialValues={{ email: "" }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 500);
                }}
                /* validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email(i18n._(t`email address is invalid`))
                    .required(i18n._(t`email is required`))
                })} */
                validate={values => {
                  let errors = {};
                  if (!values.email) {
                    errors.email = i18n._(t`required`);
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = i18n._(t`invalid email address`);
                  }
                  return errors;
                }}
              >
                {props => {
                  const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset
                  } = props;
                  return (
                    <form onSubmit={handleSubmit}>
                      <label htmlFor="email" style={{ display: "block" }}>
                        {i18n._(t`email`)}
                      </label>
                      <input
                        id="email"
                        placeholder={i18n._(t`enter your email`)}
                        type="text"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.email && touched.email
                            ? "text-input error"
                            : "text-input"
                        }
                      />
                      {errors.email && touched.email && (
                        <div className="input-feedback">{errors.email}</div>
                      )}

                      <button
                        type="button"
                        className="outline"
                        onClick={handleReset}
                        disabled={!dirty || isSubmitting}
                      >
                        Reset
                      </button>
                      <button type="submit" disabled={isSubmitting}>
                        Submit
                      </button>
                    </form>
                  );
                }}
              </Formik>
            )}
          </I18n>
        </div>
      </I18nProvider>
    );
  }
}

render(<App />, document.getElementById("root"));
