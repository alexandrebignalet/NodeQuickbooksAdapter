'use strict';

var quickbooksEntitiesState = {
    delete: ["Attachable", "Bill", "BillPayment", "CreditMemo", "Estimate", "Invoice", "JournalEntry", "Payment", "Purchase", "PurchaseOrder", "RefundReceipt", "SalesReceipt", "TimeActivity", "VendorCredit"],
    create: ["Account", "Attachable", "Bill", "BillPayment", "Class", "CreditMemo", "Customer", "Department", "Employee", "Estimate", "Invoice", "Item", "JournalEntry", "Payment", "PaymentMethod", "Purchase", "PurchaseOrder", "RefundReceipt", "SalesReceipt", "TaxAgency", "TaxService", "Term", "TimeActivity", "Vendor", "VendorCredit"],
    update: ["Account", "Attachable", "Bill", "BillPayment", "Class", "CompanyInfo", "CreditMemo", "Customer", "Department", "Employee", "Estimate", "Exchangerate", "Invoice", "Item", "JournalEntry", "Payment", "PaymentMethod", "Preferences", "Purchase", "PurchaseOrder", "RefundReceipt", "SalesReceipt", "TaxAgency", "TaxCode", "TaxRate", "TaxService", "Term", "TimeActivity", "Vendor", "VendorCredit"],
    query: ["Account", "Attachable", "Bill", "BillPayment", "Budget", "Class", "CompanyInfo", "CreditMemo", "Customer", "Department", "Employee", "Estimate", "Exchangerate", "Invoice", "Item", "JournalEntry", "Payment", "PaymentMethod", "Preferences", "Purchase", "PurchaseOrder", "RefundReceipt", "SalesReceipt", "TaxAgency", "TaxCode", "TaxRate", "Term", "TimeActivity", "Vendor", "VendorCredit"],
    get: ["Account", "Attachable", "Bill", "BillPayment", "Class", "CompanyInfo", "CreditMemo", "Customer", "Department", "Employee", "Estimate", "Exchangerate", "Invoice", "Item", "JournalEntry", "Payment", "PaymentMethod", "Preferences", "Purchase", "PurchaseOrder", "RefundReceipt", "Reports", "SalesReceipt", "TaxAgency", "TaxCode", "TaxRate", "Term", "TimeActivity", "Vendor", "VendorCredit"],
    document: ['Estimate', 'Invoice', 'SalesReceipt']
};

module.exports = quickbooksEntitiesState;