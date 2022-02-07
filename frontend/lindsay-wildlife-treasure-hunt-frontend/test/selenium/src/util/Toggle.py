from functools import wraps
import unittest
import textwrap

from src.util.LogFactory import LogFactory
from src.util.ErrorFactory import errorStackTrace

class TestMetrics:
    EXECUTED_METRICS = {
        'ran' : {
          'total' : 0,
          'tests' : []
        },
        'skipped' : {
          'total' : 0,
          'tests' : []
        },
        'passed' : {
          'total' : 0,
          'tests' : []
        },
        'failed' : {
          'total' : 0,
          'tests' : []
        },
    }

    @staticmethod
    def report():
        ALL_TESTS_RAN="\n".join(TestMetrics.EXECUTED_METRICS['ran']['tests'])
        ALL_TESTS_SKIPPED = "\n".join(TestMetrics.EXECUTED_METRICS['skipped']['tests'])
        ALL_TESTS_PASSED = "\n".join(TestMetrics.EXECUTED_METRICS['passed']['tests'])
        ALL_TESTS_FAILED = "\n".join(TestMetrics.EXECUTED_METRICS['failed']['tests'])
        report=textwrap.dedent(f"""\
=============================
============================= TEST REPORT =============================
============================= TESTS THAT WERE RUN =============================
Total Tests Ran: {TestMetrics.EXECUTED_METRICS['ran']['total']}
Tests that were run list:\n{ALL_TESTS_RAN}
============================= TESTS THAT WERE SKIPPED =============================
Total Tests Skipped: {TestMetrics.EXECUTED_METRICS['skipped']['total']}
Tests that were skipped list:\n{ALL_TESTS_SKIPPED}\n
============================= TESTS PASSED =============================
Total Tests Passed: {TestMetrics.EXECUTED_METRICS['passed']['total']}
Tests that passed list:\n{ALL_TESTS_PASSED}\n
============================= TESTS FAILED =============================
Total Tests FAILED: {TestMetrics.EXECUTED_METRICS['failed']['total']}
Tests that failed list:\n{ALL_TESTS_FAILED}\n
""".strip())
        LogFactory.MAIN_LOG.info(report)
        if TestMetrics.EXECUTED_METRICS['failed']['total'] > 0:
            raise Exception(F"TESTS FAILED DUE TO  {TestMetrics.EXECUTED_METRICS['failed']['total'] } TEST(S) FAILING")
def blank_function(test):
  LogFactory.MAIN_LOG.info(f"Skipping \'{derive_full_function_name(test)}\'")

def derive_full_function_name(test):
    if (issubclass(test.__class__, unittest.TestCase)):
        return f"{test.__module__}.{test._testMethodName}"
    else:
        return f"{test.__module__}.{test.__name__}"

def run_function(test, *args, **kwargs):
    try:
        LogFactory.MAIN_LOG.info(f"Executing \'{derive_full_function_name(test)}\'")
        test(*args,**kwargs)
        TestMetrics.EXECUTED_METRICS['passed']['total'] += 1
        TestMetrics.EXECUTED_METRICS['passed']['tests'].append(f"{derive_full_function_name(test)}")
    except Exception as e:
        TestMetrics.EXECUTED_METRICS['failed']['total'] += 1
        TestMetrics.EXECUTED_METRICS['failed']['tests'].append(f"{derive_full_function_name(test)}")
        LogFactory.MAIN_LOG.error(f"Test failed.... {errorStackTrace(e)}")

def enabled(test):
    @wraps(test)
    def enabled_test(*args, **kwargs):
        TestMetrics.EXECUTED_METRICS['ran']['tests'].append(f"{derive_full_function_name(test)}")
        TestMetrics.EXECUTED_METRICS['ran']['total'] += 1
        LogFactory.MAIN_LOG.debug(f"TEST \'{derive_full_function_name(test)}\' is enabled")
        return run_function(test, *args, **kwargs)
    return enabled_test


def disabled(reason='UNKNOWN'):
    def decorator(test):
        TestMetrics.EXECUTED_METRICS['skipped']['total'] += 1
        if(issubclass(test.__class__,unittest.TestCase)):
            TestMetrics.EXECUTED_METRICS['skipped']['tests'].append(f"{derive_full_function_name(test)}")
            LogFactory.MAIN_LOG.warning(f"UNIT TEST \'{derive_full_function_name(test)}\' is disabled, and will not run. Reason '{reason}'")
            @wraps(test)
            @unittest.skip(reason)
            def disabled_test(*args, **kwargs):
                return blank_function
            return disabled_test
        else:
            TestMetrics.EXECUTED_METRICS['skipped']['tests'].append(f"{derive_full_function_name(test)}")
            LogFactory.MAIN_LOG.warning(f"TEST \'{derive_full_function_name(test)}\' is disabled, and will not run. Reason '{reason}'")
            @wraps(test)
            def disabled_test(*args, **kwargs):
                return blank_function(test)
        return disabled_test
    return decorator